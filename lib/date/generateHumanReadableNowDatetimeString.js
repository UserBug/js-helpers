/**
 * Generates a human-readable current date-time string in the format YYYY.MM.DD HH-MM-SS-MS.
 * @returns {string}
 */
const generateHumanReadableNowDatetimeString = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Always 3 digits

  return `${year}.${month}.${day} ${hours}-${minutes}-${seconds}-${milliseconds}`;
};

export default generateHumanReadableNowDatetimeString;
