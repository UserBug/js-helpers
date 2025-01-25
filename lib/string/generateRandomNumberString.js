/**
 * Generates a random number string with the specified number of digits.
 * @param {object} arg
 * @param {number} arg.digits
 * @returns {string}
 */
const generateRandomNumberString = ({ digits }) => {
  if (digits <= 0) {
    throw new Error('Digits must be a positive integer.');
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return String(randomNumber);
};

export default generateRandomNumberString;
