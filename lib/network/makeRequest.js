import { request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import urlModule from 'url';

/**
 * @typedef {{[key: string]: string}} QueryParams
 */

/**
 * @typedef {{[key: string]: string}} Headers
 */

/**
 * @typedef {object} NetworkResponse
 * @property {string} body - The response body from the network request as text.
 * @property {number} code - The HTTP status code of the response.
 * @property {Headers} headers - Key-value pairs of response headers.
 * @property {number} responseTime - The time taken for the network request in milliseconds.
 */

/**
 * Handles chunks of data and errors with the ability to abort the request.
 * @param {object} params
 * @param {string} params.type - The type of chunk event (data, end, error).
 * @param {Error} [params.error]
 * @param {buffer} [params.chunk] - The data chunk or error object.
 * @param {object} params.req - The request object to allow aborting.
 * @param {Function} [params.chunkHandler]
 */
const chunkHandlerWithAbort = ({
  type,
  req,
  chunk = undefined,
  chunkHandler = undefined,
  error = undefined,
}) => {
  try {
    if(chunkHandler) {
      chunkHandler({ type, chunk, error })
    }
  } catch (error) {
    req.abort();
    throw error;
  }
};

/**
 * @param {object} arg
 * @param {"http:"|"https:"} arg.protocol - The HTTP or HTTPS module to use.
 * @param {URL} arg.url - The formatted URL for the request.
 * @param {{[key: string]: string}} arg.options
 * @param {number} arg.start
 * @param {Function} [arg.chunkHandler] - Optional callback for handling each chunk of data.
 * @returns {Promise<NetworkResponse>}
 */
const createPromiseForRequest = ({ protocol, url, options, start, chunkHandler = undefined }) => {
  const isHttps = String(protocol).toLowerCase() === 'https:';
  const agent = isHttps ? httpsRequest : httpRequest;

  const request = {
    ...options,
    url,
  }

  return new Promise((resolve) => {
    let data = '';

    /**
     * @param {Error} error
     */
    const handleRequestError = (error) => {
      const responseTime = Date.now() - start;
      chunkHandlerWithAbort({ type: 'error', error, req, chunkHandler });
      resolve({
        body: error.message,
        code: 500,
        headers: {},
        responseTime,
        request,
      });
    }

    const req = agent(url, options, (res) => {

      /**
       * @param {buffer} chunk - The data chunk received from the network request.
       */
      const handleRequestDataChunk = (chunk) => {
        data += String(chunk);
        chunkHandlerWithAbort({ type: 'data', chunk, req, chunkHandler });
      }

      /**
       *
       */
      const handleRequestEnd = () => {
        const responseTime = Date.now() - start;
        chunkHandlerWithAbort({ type: 'end', req, chunkHandler });
        resolve({
          body: data,
          code: res.statusCode,
          headers: res.headers,
          responseTime,
          request,
        });
      }

      res.on('data', handleRequestDataChunk);
      res.on('end', handleRequestEnd);
    });

    req.on('error', handleRequestError);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
};

/**
 * @param {object} arg
 * @param {string} [arg.method='GET'] - The HTTP method
 * @param {string} arg.url
 * @param {{[key: string]: string}} [arg.query] - URL query parameters.
 * @param {{[key: string]: string}} [arg.headers] - Key-value pairs for request headers.
 * @param {string|null} [arg.body='']
 * @param {Function} [arg.chunkHandler] - Optional callback for handling each chunk of data.
 * @returns {Promise<NetworkResponse>}
 */
const makeRequest = async ({
  method = 'GET',
  url = 'http://localhost:8080/api',
  query = undefined,
  headers = undefined,
  body = '',
  chunkHandler = undefined,
}) => {
  const start = Date.now();

  const urlObject = urlModule.parse(url);
  const formattedUrl = urlModule.format({
    ...urlObject,
    query
  });

  const options = {
    method,
    headers: {
      'Content-Type': 'text/plain',
      ...(headers || {}),
    },
    body: body ? body : '',
  };

  if(urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
    throw new Error(`Unsupported protocol: "${urlObject.protocol}"`);
  }

  return createPromiseForRequest({
    protocol: urlObject.protocol,
    url: String(formattedUrl),
    options,
    start,
    chunkHandler,
  });
};

export default makeRequest;
