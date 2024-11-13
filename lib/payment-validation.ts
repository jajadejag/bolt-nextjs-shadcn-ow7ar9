export interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  phone?: string;
  personalNumber?: string;
}

export function validatePaymentDetails(
  method: 'card' | 'swish' | 'klarna',
  details: PaymentDetails
): { isValid: boolean; error?: string } {
  switch (method) {
    case 'card':
      if (!details.cardNumber?.match(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/)) {
        return { isValid: false, error: "Ogiltigt kortnummer" };
      }
      if (!details.expiryDate?.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        return { isValid: false, error: "Ogiltigt utgångsdatum" };
      }
      if (!details.cvv?.match(/^\d{3,4}$/)) {
        return { isValid: false, error: "Ogiltig CVV-kod" };
      }
      break;

    case 'swish':
      if (!details.phone?.match(/^07[0-9]{1}-?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/)) {
        return { isValid: false, error: "Ogiltigt telefonnummer" };
      }
      break;

    case 'klarna':
      if (!details.personalNumber?.match(/^(19|20)\d{6}-\d{4}$/)) {
        return { isValid: false, error: "Ogiltigt personnummer (format: ÅÅÅÅMMDD-XXXX)" };
      }
      // Validate Luhn algorithm for personal number
      const digits = details.personalNumber.replace(/\D/g, '');
      let sum = 0;
      let isEven = false;
      
      // Loop through values starting from the rightmost side
      for (let i = digits.length - 1; i >= 0; i--) {
        let currentDigit = parseInt(digits[i]);
        
        if (isEven) {
          currentDigit *= 2;
          if (currentDigit > 9) {
            currentDigit -= 9;
          }
        }
        
        sum += currentDigit;
        isEven = !isEven;
      }
      
      if (sum % 10 !== 0) {
        return { isValid: false, error: "Ogiltigt personnummer (kontrollsiffra)" };
      }
      break;
  }

  return { isValid: true };
}