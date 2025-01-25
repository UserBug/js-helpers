import getFullPath from '../fs/getFullPath.js'
import getUTCDateString from '../date/getUTCDateString.js'

export const LOG_DIR = getFullPath({ relativePath: './logs/' }) // eslint-disable-line const-case/uppercase

const DAY_FORMAT = 'YYYY-MM-DD'
const TODAY_FILE_PATH = `${LOG_DIR}/${getUTCDateString()}-server.log` // eslint-disable-line const-case/uppercase

/**
 * @typedef {object} WinstonPrintFunctionArg
 * @property {string} timestamp - The timestamp of the log entry.
 * @property {string} level - The log level (e.g., 'info', 'error').
 * @property {string} label - The label associated with the log entry.
 * @property {string} message - The log message.
 */

/**
 * @typedef {object} JsHelpersLoggerOptions
 * @property {string} [filename] - The path to the log file.
 * @property {string} [maxSize] - The maximum size of the log file (e.g., '1g' for 1 gigabyte).
 * @property {string} [maxDays] - The number of days to retain logs (e.g., '3d' for 3 days).
 * @property {string} [datePattern] - The date format pattern used for log file rotation.
 * @property {string} [timestampFormat] - The format for timestamps in log messages.
 * @property {(arg: WinstonPrintFunctionArg) => string} [printFunction] - Function to format log messages.
 */

/**
 * @param {WinstonPrintFunctionArg} info
 * @returns {`[${string}] [${string}] (${string}): ${string}`}
 */
const winstonPrintFunction = (info) => `[${info.timestamp}] [${info.level}] (${info.label}): ${info.message}`

/** @type {JsHelpersLoggerOptions} */
const defaultOptions = {
  filename: TODAY_FILE_PATH,
  maxSize: '1g',
  maxDays: '3d',
  datePattern: DAY_FORMAT,
  timestampFormat: `${DAY_FORMAT} HH:mm:ss ms`,
  printFunction: winstonPrintFunction,
}

export default defaultOptions;
