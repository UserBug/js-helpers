import process from 'process';
import path from 'path';

const rootDir = path.resolve(process.cwd());

/**
 * @param {object} arg
 * @param {string} arg.relativePath
 * @returns {string}
 */
const getFullPath = ({ relativePath }) => (
  path.resolve(rootDir, relativePath)
)

export default getFullPath
