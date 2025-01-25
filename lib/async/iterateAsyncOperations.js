/**
 * Iterates over an array of argument arrays and processes them sequentially.
 * @param {object} arg
 * @param {any[][]} arg.argsArray - An array containing arrays of arguments for each call.
 * @param {Function} arg.asyncOperationFunction - The async function to process each set of arguments.
 * @param {boolean} [arg.fallOnError=true] - Whether to stop execution on the first error.
 * @returns {Promise<Array>} - A promise that resolves to an array of responses.
 */
const iterateAsyncOperations = ({ argsArray, asyncOperationFunction, fallOnError = true }) => {
  const results = [];
  let promiseChain = Promise.resolve();

  const isNode = typeof setImmediate !== 'function';

  /**
   * @param {Function} resolve
   * @returns {*|number}
   */
  const waitNextEventLoopCycle = (resolve) => (isNode ? setImmediate(resolve) : setTimeout(resolve, 0));

  /**
   * @param {Error} error
   */
  const catchError = (error) => {
    if (fallOnError) {
      throw error;
    } else {
      results.push({ error: error.message });
    }
  }

  /**
   * @param {any[]} args
   */
  const addToPromiseChain = (args) => {
    promiseChain = promiseChain.then(() => (
      new Promise(waitNextEventLoopCycle)
        .then(() => asyncOperationFunction(...args))
        .then((result) => results.push(result))
        .catch(catchError)
    ));
  };

  argsArray.forEach(addToPromiseChain);

  return promiseChain.then(() => results);
};

export default iterateAsyncOperations;
