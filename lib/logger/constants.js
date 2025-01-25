import getFullPath from '../fs/getFullPath.js'
import getUTCDateString from '../date/getUTCDateString.js'

export const LOG_DIR = getFullPath({ relativePath: './logs/' }) // eslint-disable-line const-case/uppercase

const DAY_FORMAT = 'YYYY-MM-DD'
const TODAY_FILE_PATH = `${LOG_DIR}/${getUTCDateString()}-server.log` // eslint-disable-line const-case/uppercase

/**
 * @param {object} info
 * @param {string} info.timestamp
 * @param {string} info.level
 * @param {string} info.label
 * @param {string} info.message
 * @returns {`[${string}] [${string}] (${string}): ${string}`}
 */
const winstonPrintFunction = (info) => `[${info.timestamp}] [${info.level}] (${info.label}): ${info.message}`

const constants = {
  filename: TODAY_FILE_PATH,
  maxSize: '1g',
  maxDays: '3d',
  datePattern: DAY_FORMAT,
  timestampFormat: `${DAY_FORMAT} HH:mm:ss ms`,
  printFunction: winstonPrintFunction,
}

export default constants;
