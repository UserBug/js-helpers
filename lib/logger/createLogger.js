import winston from 'winston';

import constants from './constants.js'
import winstonConsoleTransport from './winstonConsoleTransport.js'
import winstonFileTransport from './winstonFileTransport.js'

/**
 * @typedef {import('winston').Logger} Logger
 */

/**
 * @param {object} arg
 * @param {string} arg.label
 * @returns {Logger}
 */
const createLogger = ({ label }) => {
  const logger = winston.createLogger({
    maxsize: '500m',
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.timestamp({format: constants.timestampFormat }),
      winston.format.printf(constants.printFunction)
    ),
    transports: [
      winstonConsoleTransport,
      winstonFileTransport,
    ],
  });
  return logger
}

export default createLogger;
