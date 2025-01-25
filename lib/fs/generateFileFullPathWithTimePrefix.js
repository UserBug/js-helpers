import generateHumanReadableNowDatetimeString from '../date/generateHumanReadableNowDatetimeString.js';
import generateRandomNumberString from '../string/generateRandomNumberString.js';

import getFullPath from './getFullPath.js';
import checkIsFileExist from './checkIsFileExist.js';

/**
 * @param {object} arg
 * @param {string} arg.fileName
 * @param {string} arg.fileDir
 * @returns {Promise<string>}
 */
const generateFileFullPathWithTimePrefix = async ({ fileName, fileDir }) => {
  const tempFileRelatedPath = `${
    fileDir
  }/${
    generateHumanReadableNowDatetimeString()
  } (${
    generateRandomNumberString({ digits: 3 })
  }) ${
    fileName
  }`;
  let tempFileFullPath = getFullPath({ relativePath: tempFileRelatedPath });

  if(await checkIsFileExist({ filePath: tempFileFullPath })) {
    tempFileFullPath = await generateFileFullPathWithTimePrefix({ fileName })
  }

  return tempFileFullPath;
}

export default generateFileFullPathWithTimePrefix;
