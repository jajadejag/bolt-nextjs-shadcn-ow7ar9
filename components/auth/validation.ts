export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  password?: boolean;
}

export function validateField(value: string, rules: ValidationRules): string | null {
  if (rules.required && !value) {
    return "Detta fält är obligatoriskt";
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Minst ${rules.minLength} tecken krävs`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Max ${rules.maxLength} tecken tillåtna`;
  }

  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Ogiltig e-postadress";
  }

  if (rules.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
    return "Lösenordet måste innehålla minst 8 tecken, en bokstav och en siffra";
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return "Ogiltigt format";
  }

  return null;
}