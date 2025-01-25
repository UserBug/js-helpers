import winston from 'winston';

import constants from './constants.js'

const winstonAddColorsAndTimeToConsole = winston.format.combine(
  winston.format.colorize({all:true}),
  winston.format.timestamp({format: constants.timestampFormat }),
  winston.format.printf(constants.printFunction)
);

const winstonConsoleWithColorsFormat = winston.format.combine(
  winston.format.colorize(),
  winstonAddColorsAndTimeToConsole
)

const winstonConsoleTransport = new winston.transports.Console({
  format: winstonConsoleWithColorsFormat,
})

export default winstonConsoleTransport
