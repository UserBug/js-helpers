import { promises as fs } from 'fs';

import fsLogger from './fsLogger.js'

/**
 * @param {object} arg
 * @param {string} arg.dirPath
 * @returns {Promise<void>}
 */
const createDir = async ({ dirPath }) => {
  await fs.mkdir(dirPath, { recursive: true });
  fsLogger.info(`Dir created at ${dirPath}`)
};

export default createDir;
