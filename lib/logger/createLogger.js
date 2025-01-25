import winston from 'winston';

import defaultOptions from './defaultOptions.js'
import createWinstonConsoleTransport from './createWinstonConsoleTransport.js'
import createWinstonFileTransport from './createWinstonFileTransport.js'

/**
 * @typedef {import('winston').Logger} Logger
 */

/**
 * @param {object} arg
 * @param {string} arg.label
 * @param {LoggerOptions} [arg.options={}]
 * @returns {Logger}
 */
const createLogger = ({ label , options = {} }) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const winstonConsoleTransport = createWinstonConsoleTransport({ options: mergedOptions });
  const winstonFileTransport = createWinstonFileTransport({ options: mergedOptions });

  const logger = winston.createLogger({
    maxsize: '500m',
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.timestamp({format: mergedOptions.timestampFormat }),
      winston.format.printf(mergedOptions.printFunction)
    ),
    transports: [
      winstonConsoleTransport,
      winstonFileTransport,
    ],
  });
  return logger
}

export default createLogger;
