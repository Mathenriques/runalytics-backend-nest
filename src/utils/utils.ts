export const generateRandomSixDigitCode = (): string => {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
};