import { promises as fs } from 'fs';

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @returns {Promise<string|null>} The file content as a string, or null if the file is absent.
 */
const readTextFile = async ({ filePath }) => {
  let fileContent = null;
  await fs.readFile(filePath, 'utf8')
    .then((fileContentString) => {
      fileContent = fileContentString;
    })
    .catch((error) => {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    });
  return fileContent;
};

export default readTextFile;
