export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export function isStrongPassword(password: string) {
  const hasMinimumLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNoSpaces = !/\s/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  return (
    hasMinimumLength &&
    hasUppercase &&
    hasNoSpaces &&
    hasNumber &&
    hasSpecialCharacter
  );
}
