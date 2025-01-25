import { promises as fs } from 'fs';

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @returns {Promise<boolean>} True if the file exists, false otherwise.
 */
const checkIsFileExist = async ({ filePath }) => {
  const stats = await fs.stat(filePath).catch(() => null);
  return stats?.isFile() ?? false;
};

export default checkIsFileExist;
