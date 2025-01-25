import checkIsDirExist from './checkIsDirExist.js'
import createDir from './createDir.js'

/**
 * @param {object} arg
 * @param {string} arg.dirPath
 * @returns {Promise<boolean>} True if the directory exists, false otherwise.
 */
const createDirIfNotExist = async ({ dirPath }) => {
  const isDirExistsBeforeCreation = await checkIsDirExist({ dirPath });
  if (!isDirExistsBeforeCreation) {
    await createDir({ dirPath });
  }
  return isDirExistsBeforeCreation
};

export default createDirIfNotExist;
