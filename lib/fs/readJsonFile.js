import readTextFile from './readTextFile.js';

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @returns {Promise<{[key: string]: any}|null>}
 */
const readJsonFile = async ({ filePath }) => {
  let jsonObject = null
  const fileContentString = await readTextFile({ filePath })
  if(fileContentString) {
    jsonObject = JSON.parse(fileContentString);
  }
  return jsonObject;
}

export default readJsonFile;
