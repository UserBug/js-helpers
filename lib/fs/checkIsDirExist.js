import { promises as fs } from 'fs';

/**
 * @param {object} arg
 * @param {string} arg.dirPath
 * @returns {Promise<boolean>}
 */
const checkIsDirExist = async ({ dirPath }) => {
  const stats = await fs.stat(dirPath).catch(() => null);
  return stats?.isDirectory() ?? false;
};

export default checkIsDirExist;
