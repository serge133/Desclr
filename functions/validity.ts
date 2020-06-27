export const emailValidityFunction = (email: string): string => {
  if (!email.includes('@') || email.includes(' ') || !email.includes('.')) {
    return "Doesn't look like a valid email";
  }
  return 'No Error';
};

export const passwordValidityFunction = (password: string): string => {
  if (password.length <= 6) {
    return 'Password needs to be longer than 6 characters';
  }
  if (password.includes(' ')) {
    return 'Password must not contain spaces';
  }
  return 'No Error';
};

export const confirmPasswordValidityFunction = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return "Passwords don't match";
  }

  return 'No Error';
};
