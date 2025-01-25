/**
 * @param {object} arg
 * @param {string} arg.fieldValue
 * @returns {string}
 */
const escapeCsvField = ({ fieldValue }) => {
  const fieldString = fieldValue !== null && fieldValue !== undefined ? String(fieldValue) : '';
  return `"${fieldString.replace(/"/g, '""')}"`;
};

/**
 * @param {object} arg
 * @param {{[key: string]: any}[]} arg.jsonArray
 * @param {string[]} arg.keys
 * @param {string} arg.separator
 * @returns {*[]}
 */
const escapeJsonArray = ({ jsonArray, keys, separator }) => {
  const csvRows = [];
  jsonArray.forEach((row) => {
    const csvRow = keys.map((key) => escapeCsvField({ fieldValue: row[key] }));
    csvRows.push(csvRow.join(separator));
  });
  return csvRows;
}

/**
 * Generates a CSV string from a JSON array.
 * @param {object} arg
 * @param {{[key: string]: any}[]} arg.jsonArray
 * @param {{ title: string }[]} [arg.columns]
 * @param {string} [arg.separator=","]
 * @returns {string}
 */
const generateCsvString = ({ jsonArray, columns = null, separator = ',' }) => {
  let csvString = ''

  if (!Array.isArray(jsonArray)) {
    throw new Error(`jsonArray is not Array, "${typeof jsonArray}" received.`)
  }

  if(jsonArray.length === 0) {
    csvString = ''
  } else {
    const headers = columns ? columns.map(col => col.title) : Object.keys(jsonArray[0]);
    const keys = columns ? columns.map(col => col.title) : Object.keys(jsonArray[0]);

    const csvRows = escapeJsonArray({ jsonArray, keys, separator });
    // Add headers if columns are provided
    if (columns) {
      csvRows.unshift(headers.join(separator));
    }

    csvString = csvRows.join('\n');
  }

  return csvString;
};

export default generateCsvString;

