import saveTextFile from './saveTextFile.js';

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @param {object} arg.jsonObject
 * @returns {Promise<void>}
 */
const saveJsonFile = async ({ filePath, jsonObject }) => {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  await saveTextFile({ filePath, fileContent: jsonString });
};

export default saveJsonFile;
