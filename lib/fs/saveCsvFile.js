import generateCsvString from '../string/generateCsvString.js'

import saveTextFile from './saveTextFile.js'

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @param {{[key: string]: any}[]} arg.jsonArray
 * @param {{ title: string }[]} [arg.columns]
 * @param {string} [arg.separator=","]
 * @returns {Promise<void>}
 */
const saveCsvFile = async ({ filePath, jsonArray, separator = ',', columns = null }) => {
  const csvString = generateCsvString({ jsonArray, columns, separator });
  await saveTextFile({ filePath, fileContent: csvString });
};

export default saveCsvFile;
