import winston from 'winston';

/**
 * @param {object} arg
 * @param {JsHelpersLoggerOptions} arg.options
 * @returns {winston.FileTransportInstance}
 */
const createWinstonFileTransport = ({ options }) => {
  const winstonFileTransport = new winston.transports.File({
    filename: options.filename,
    maxSize: options.maxSize,
    maxDays: options.maxDays,
    datePattern: options.datePattern,
  })
  return winstonFileTransport;
};

export default createWinstonFileTransport
