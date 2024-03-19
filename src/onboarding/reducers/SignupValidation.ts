import {EmailUsernameError, PasswordError} from './SignupUiState';

export function hasUsernameError(
  username: string,
): EmailUsernameError | undefined {
  const valueToReturn =
    username.length === 0 ? EmailUsernameError.Empty : undefined;
  return valueToReturn;
}
export function hasEmailError(email: string): EmailUsernameError | undefined {
  if (email.length == 0) return EmailUsernameError.Empty;
  if (!email.includes('@')) return EmailUsernameError.NoAtSign;
  else return undefined;
}
export function hasPasswordErrors(
  password: string,
): PasswordError[] | undefined {
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;

  const errors: PasswordError[] = [];

  if (password.length === 0) errors.push('Empty');
  if (!hasLowerCase.test(password)) errors.push('NoLowercaseLetters');
  if (!hasUpperCase.test(password)) errors.push('NoUppercaseLetters');
  if (!hasNumber.test(password)) errors.push('NoNumbers');
  if (!hasSpecialChar.test(password)) errors.push('NoSpecialChars');
  if (password.length < 6) errors.push('TooShort');

  return Object.keys(errors).length === 0 ? undefined : errors;
}
