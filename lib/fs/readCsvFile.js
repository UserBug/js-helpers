import {parse} from 'csv-parse';

import readTextFile from './readTextFile.js';

/**
 * @param {object} arg
 * @param {string} arg.filePath
 * @param {string} [arg.columnSeparator]
 * @param {string} [arg.rowSeparator]
 * @param {string[]} [arg.columns]
 * @returns {Promise<string[][]>}
 */
const readCsvFile = async ({filePath, columnSeparator = ',', rowSeparator = '\n', columns = undefined }) => {
  const csvString = await readTextFile({filePath});
  return new Promise((resolve, reject) => {
    parse(
      csvString,
      {
        delimiter: columnSeparator,
        record_delimiter: rowSeparator, // eslint-disable-line camelcase
        trim: true, // Remove surrounding whitespaces
        skip_empty_lines: false, // eslint-disable-line camelcase
        columns,
      },
      (err, records) => {
        if (err) {
          reject(err);
        } else {
          resolve(records);
        }
      }
    );
  });
};

export default readCsvFile;
