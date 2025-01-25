/**
 * @param {object} arg
 * @param {string} arg.body
 * @returns {{[key: string]: any}}
 */
const parseBodyToJson = ({ body }) => {
  let data = {};
  try {
    data = JSON.parse(body);
  } catch (error) { // eslint-disable-line no-unused-vars
    throw new Error(`Failed parse body to JSON: "${body}"`);
  }
  return data;
}

export default parseBodyToJson;
