"use client";

import { useToast } from '@/components/ui/use-toast';

interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
  status?: 'pending' | 'completed' | 'failed';
  errorCode?: string;
  redirectUrl?: string;
}

interface PaymentDetails {
  method: 'card' | 'swish' | 'klarna' | 'apple-pay' | 'google-pay';
  amount: number;
  currency?: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
  };
  swishDetails?: {
    phone: string;
  };
  klarnaDetails?: {
    personalNumber: string;
  };
  googlePayDetails?: {
    token: string;
  };
  applePayDetails?: {
    token: string;
  };
}

export async function processPayment(details: PaymentDetails): Promise<PaymentResult> {
  try {
    // Log payment attempt
    console.log('Processing payment:', {
      method: details.method,
      amount: details.amount,
      timestamp: new Date().toISOString()
    });

    // Validate payment details
    const validationError = validatePaymentDetails(details);
    if (validationError) {
      throw new Error(validationError);
    }

    // Handle different payment methods
    switch (details.method) {
      case 'swish':
        return await processSwishPayment(details);
      case 'google-pay':
        return await processGooglePayPayment(details);
      case 'apple-pay':
        return await processApplePayPayment(details);
      case 'klarna':
        return await processKlarnaPayment(details);
      default:
        return await processCardPayment(details);
    }
  } catch (error) {
    // Log payment error
    console.error('Payment failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ett oväntat fel uppstod',
      status: 'failed',
      errorCode: getErrorCode(error)
    };
  }
}

async function processSwishPayment(details: PaymentDetails): Promise<PaymentResult> {
  // Simulate Swish API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate QR code or get redirect URL
  const redirectUrl = `swish://paymentrequest?token=${generateToken()}`;

  return {
    success: true,
    status: 'pending',
    redirectUrl,
    transactionId: generateTransactionId()
  };
}

async function processGooglePayPayment(details: PaymentDetails): Promise<PaymentResult> {
  if (!details.googlePayDetails?.token) {
    throw new Error('Google Pay token is required');
  }

  // Simulate Google Pay API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    status: 'completed',
    transactionId: generateTransactionId()
  };
}

async function processApplePayPayment(details: PaymentDetails): Promise<PaymentResult> {
  if (!details.applePayDetails?.token) {
    throw new Error('Apple Pay token is required');
  }

  // Simulate Apple Pay API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    status: 'completed',
    transactionId: generateTransactionId()
  };
}

async function processKlarnaPayment(details: PaymentDetails): Promise<PaymentResult> {
  if (!details.klarnaDetails?.personalNumber) {
    throw new Error('Personal number is required for Klarna');
  }

  // Simulate Klarna API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    status: 'pending',
    redirectUrl: `https://klarna.com/checkout/${generateToken()}`,
    transactionId: generateTransactionId()
  };
}

async function processCardPayment(details: PaymentDetails): Promise<PaymentResult> {
  if (!details.cardDetails) {
    throw new Error('Card details are required');
  }

  // Simulate card payment processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    status: 'completed',
    transactionId: generateTransactionId()
  };
}

function validatePaymentDetails(details: PaymentDetails): string | null {
  switch (details.method) {
    case 'card':
      if (!details.cardDetails) return 'Card details are required';
      if (!validateCardNumber(details.cardDetails.number)) 
        return 'Invalid card number';
      if (!validateExpiryDate(details.cardDetails.expiry))
        return 'Invalid expiry date';
      if (!validateCVV(details.cardDetails.cvv))
        return 'Invalid CVV';
      break;
    
    case 'swish':
      if (!details.swishDetails?.phone) return 'Phone number is required';
      if (!validatePhoneNumber(details.swishDetails.phone))
        return 'Invalid phone number';
      break;
    
    case 'klarna':
      if (!details.klarnaDetails?.personalNumber) 
        return 'Personal number is required';
      if (!validatePersonalNumber(details.klarnaDetails.personalNumber))
        return 'Invalid personal number';
      break;
    
    case 'google-pay':
      if (!details.googlePayDetails?.token)
        return 'Google Pay token is required';
      break;
    
    case 'apple-pay':
      if (!details.applePayDetails?.token)
        return 'Apple Pay token is required';
      break;
    
    default:
      return 'Invalid payment method';
  }

  if (!details.amount || details.amount <= 0) {
    return 'Invalid amount';
  }

  return null;
}

function validateCardNumber(number: string): boolean {
  const cleaned = number.replace(/\s/g, '');
  if (!/^\d{16}$/.test(cleaned)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

function validateExpiryDate(expiry: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
  
  const [month, year] = expiry.split('/').map(Number);
  const now = new Date();
  const expDate = new Date(2000 + year, month - 1);
  
  return (
    month >= 1 && 
    month <= 12 && 
    expDate > now &&
    year >= (now.getFullYear() - 2000) &&
    year <= (now.getFullYear() - 2000 + 10)
  );
}

function validateCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[^\d]/g, '');
  return /^07[0-9]{8}$/.test(cleaned);
}

function validatePersonalNumber(pnr: string): boolean {
  const cleaned = pnr.replace(/[^\d]/g, '');
  if (!/^\d{12}$/.test(cleaned)) return false;

  // Validate Swedish personal number format (YYYYMMDDXXXX)
  const year = parseInt(cleaned.substring(0, 4));
  const month = parseInt(cleaned.substring(4, 6));
  const day = parseInt(cleaned.substring(6, 8));

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function generateTransactionId(): string {
  return `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateToken(): string {
  return `TOKEN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getErrorCode(error: unknown): string {
  if (error instanceof Error) {
    switch (true) {
      case error.message.includes('card'):
        return 'ERR_INVALID_CARD';
      case error.message.includes('phone'):
        return 'ERR_INVALID_PHONE';
      case error.message.includes('personal'):
        return 'ERR_INVALID_PERSONAL_NUMBER';
      case error.message.includes('network'):
        return 'ERR_NETWORK';
      case error.message.includes('timeout'):
        return 'ERR_TIMEOUT';
      case error.message.includes('google'):
        return 'ERR_GOOGLE_PAY';
      case error.message.includes('apple'):
        return 'ERR_APPLE_PAY';
      default:
        return 'ERR_UNKNOWN';
    }
  }
  return 'ERR_UNKNOWN';
}