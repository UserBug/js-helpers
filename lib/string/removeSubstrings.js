/**
 * Escapes special regex characters in a string.
 * @param {object} arg
 * @param {string} arg.inputString
 * @returns {string}
 */
export const escapeRegex = ({ inputString }) => {
  return inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special regex characters
};

/**
 * @param {object} arg
 * @param {string} arg.inputString
 * @param {string[]} arg.removeStrings
 * @returns {string}
 */
const removeSubstrings = ({ inputString, removeStrings }) => {
  const escapedRemoveStrings = removeStrings.map((removeString) => escapeRegex({ inputString: removeString }))
  const pattern = new RegExp(escapedRemoveStrings.join('|'), 'gi');
  return inputString.replace(pattern, '');
};

export default removeSubstrings;
