import { promises as fs } from 'fs';

import fsLogger from './fsLogger.js'

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @param {string} arg.fileContent
 * @returns {Promise<void>}
 */
const saveTextFile = async ({ filePath, fileContent }) => {
  await fs.writeFile(filePath, fileContent, 'utf8');
  fsLogger.info(`File saved to ${filePath}`)
};

export default saveTextFile;
