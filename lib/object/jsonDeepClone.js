/**
 * @param {object} arg
 * @param {{[key: string]: any}} arg.jsonObject
 * @returns {{[key: string]: any}}
 */
const jsonDeepClone = ({ jsonObject }) => (
  JSON.parse(JSON.stringify(jsonObject))
)

export default jsonDeepClone;
