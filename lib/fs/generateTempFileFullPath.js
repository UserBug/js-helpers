import generateFileFullPathWithTimePrefix from './generateFileFullPathWithTimePrefix.js';
import {TEMP_DIR} from '../../constants.js';

/**
 * @param {object} arg
 * @param {string} arg.fileName
 * @returns {Promise<string>}
 */
const generateTempFileFullPath = async ({ fileName }) => {
  return generateFileFullPathWithTimePrefix({
    fileName,
    fileDir: TEMP_DIR
  })
}

export default generateTempFileFullPath;
