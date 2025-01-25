// Define character mappings for Ukrainian
const ukrainianChars = [1108, 1111, 1110, 1106];

/**
 * Identifies languages based on unique characters in the input string.
 * @param {object} arg
 * @param {string} arg.input
 * @returns {string[]} An array of language abbreviations detected in the input string.
 */
const identifyLanguage = ({ input }) => {
  const normalizedInput = input.toLowerCase().replace(/[\n\d]/g, ''); // Normalize input to lowercase for case-insensitivity
  const uniqueChars = Array.from(new Set(normalizedInput)); // Get unique characters in the string
  const detectedLanguages = [];

  const hasEnglishChar = /[a-z]/.test(normalizedInput); // Check for English characters
  const hasCyrillicChar = /[\u0400-\u04FF]/.test(normalizedInput); // Check for Cyrillic characters
  const hasUkrainianChar = uniqueChars.some((char) => ukrainianChars.includes(char.charCodeAt(0)));

  if (hasEnglishChar) {
    detectedLanguages.push('EN');
  }

  if (hasCyrillicChar) {
    if (hasUkrainianChar) {
      detectedLanguages.push('UA');
    } else {
      detectedLanguages.push('RU');
    }
  }

  return detectedLanguages;
};

export default identifyLanguage;
