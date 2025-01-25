import makeRequest from './makeRequest.js';
import parseBodyToJson from './parseBodyToJson.js';

/**
 * @typedef {object} NetworkJsonResponse
 * @property {{[key: string]: any}} data - The response body from the network request as text.
 * @property {string} body
 * @property {{[key: string]: any}} data
 * @property {number} code - The HTTP status code of the response.
 * @property {Headers} headers - Key-value pairs of response headers.
 * @property {number} responseTime - The time taken for the network request in milliseconds.
 */

/**
 * Makes a JSON network request and parses the response as JSON.
 * @param {object} arg
 * @param {string} arg.url
 * @param {string} [arg.method='POST']
 * @param {query} [arg.query=undefined] - Key-value pairs to append as URL query parameters.
 * @param {object} [arg.bodyJson=undefined] - The JSON object to send as the body.
 * @param {headers} [arg.headers=undefined] - Key-value pairs for request headers.
 * @param {Function} [arg.chunkHandler] - Optional callback for handling each chunk of data.
 * @returns {Promise<NetworkJsonResponse>}
 */
const makeJsonRequest = async ({
  url,
  method = 'POST',
  query = undefined,
  headers = undefined,
  bodyJson = undefined,
  chunkHandler = undefined,
}) => {
  const response = await makeRequest({
    method,
    url,
    query,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: bodyJson ? JSON.stringify(bodyJson) : undefined,
    chunkHandler,
  });

  return {
    ...response,
    data: parseBodyToJson({ body: response.body }),
  };
};

export default makeJsonRequest;
