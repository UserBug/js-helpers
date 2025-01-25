/**
 * Converts date to a format compatible with Google Sheets and Excel.
 * @param {object} arg
 * @param {string} arg.dateString
 * @returns {string} YYYY-MM-DD HH:MM:SS
 */
const formatDateForSpreadsheet = ({ dateString }) => {
  const date = new Date(dateString);
  return date.toISOString().replace('T', ' ').replace('Z', '');
};

export default formatDateForSpreadsheet;
