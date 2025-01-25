import winston from 'winston';

import constants from './constants.js'

const winstonFileTransport = new winston.transports.File({
  filename: constants.filename,
  maxSize: constants.maxSize,
  maxDays: constants.maxDays,
  datePattern: constants.datePattern,
})

export default winstonFileTransport
