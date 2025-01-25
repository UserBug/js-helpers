/**
 * @param {object} arg
 * @param {string} arg.idString
 * @returns {boolean}
 */
const validateId = ({ idString }) => {
  const VALID_CHARACTERS_REGEX = /^[a-zA-Z0-9_-]+$/;
  return VALID_CHARACTERS_REGEX.test(idString);
};

export default validateId;
