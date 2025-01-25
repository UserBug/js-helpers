import winston from 'winston';

/**
 * @param {object} arg
 * @param {JsHelpersLoggerOptions} arg.options
 * @returns {winston.ConsoleTransportInstance}
 */
const createWinstonConsoleTransport = ({ options }) => {
  const winstonAddColorsAndTimeToConsole = winston.format.combine(
    winston.format.colorize({all:true}),
    winston.format.timestamp({format: options.timestampFormat }),
    winston.format.printf(options.printFunction)
  );

  const winstonConsoleWithColorsFormat = winston.format.combine(
    winston.format.colorize(),
    winstonAddColorsAndTimeToConsole
  )

  const winstonConsoleTransport = new winston.transports.Console({
    format: winstonConsoleWithColorsFormat,
  })

  return winstonConsoleTransport;
}

export default createWinstonConsoleTransport
