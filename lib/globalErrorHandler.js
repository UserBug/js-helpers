import createLogger from './logger/createLogger.js';
const logger = createLogger({ label: 'GlobalError' })

/**
 * @param {Error} error
 */
const globalErrorHandler = async (error) => {
  logger.error(String(error));
  console.error(error); // eslint-disable-line no-console
}

export default globalErrorHandler;
