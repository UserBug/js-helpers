import readTextFile from './readTextFile.js';

/**
 * @param {object} arg - The raw file content.
 * @param {string} arg.text - The raw file content.
 * @returns {string[]} An array of valid key-value lines.
 */
const getRows = ({ text }) => {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='));
};

/**
 * @param {object} arg - The raw file content.
 * @param {string[]} arg.rows - The raw file content.
 * @returns {{[key: string]: string}} An array of valid key-value lines.
 */
const convertRowsToObject = ({ rows }) => {
  const jsonObject = {}
  rows.forEach(line => {
    const [key, value] = line.split('=');
    jsonObject[key.trim()] = value.trim();
  });
  return jsonObject;
};

/**
 * Reads an environment file and parses its parameters into an object.
 *
 * @param {string} filePath - The path to the .env file.
 * @returns {Promise<Object|null>} A key-value object of environment variables, or null if the file is absent.
 */
const readEnvFile = async ({ filePath }) => {
  let envObject = null;
  const fileContent = await readTextFile({ filePath });

  if (fileContent) {
    const rows = getRows({ text: fileContent });
    envObject = convertRowsToObject({ rows });
  }

  return envObject;
};

export default readEnvFile;