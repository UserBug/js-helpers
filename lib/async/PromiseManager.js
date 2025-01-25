import { v4 as uuidv4 } from 'uuid';

/**
 * Class for managing promises with separate states per instance.
 */
class PromiseManager {
  MISSING_STATUS = 'missing';
  EXPIRED_STATUS = 'expired';
  RESOLVED_STATUS = 'resolved';
  DELETED_STATUS = 'deleted';

  /**
   * @param {object} arg
   * @param {number} [arg.maxWaitingTimeMs]
   */
  constructor({ maxWaitingTimeMs= 360000 } = {}) {
    this.maxWaitingTimeMs = maxWaitingTimeMs;
    this.storage = new Map();
  }

  /**
   * @returns {string}
   */
  generateId() {
    return uuidv4();
  }

  /**
   * Creates a promise for a specific promise ID.
   * @param {object} arg
   * @param {string} arg.promiseId
   * @returns {Promise<any>}
   */
  createPromise({ promiseId }) {
    if (this.storage.has(promiseId)) {
      throw new Error(`Promise ID ${promiseId} already exists.`);
    }

    const expirationTime = Date.now() + this.maxWaitingTimeMs;

    const storedItem = { id: promiseId, expirationTime }
    storedItem.promise = new Promise((resolve, reject) => {
      storedItem.resolve = resolve;
      storedItem.reject = reject;
    });
    this.storage.set(promiseId, storedItem);

    return storedItem.promise;
  }

  /**
   * Resolves the promise associated with the given promise ID.
   * @param {object} arg
   * @param {string} arg.promiseId
   * @param {{[key: string]: any}} arg.data
   * @returns {'notFound'|'expired'|'resolved'}
   */
  resolvePromise({ promiseId, data }) {
    let resolutionStatus
    const storedItem = this.storage.get(promiseId);
    if (!storedItem) {
      resolutionStatus = this.MISSING_STATUS;
    } else {
      const isExpired = Number(Date.now()) > storedItem.expirationTime;

      if (isExpired) {
        resolutionStatus = this.EXPIRED_STATUS
        storedItem.reject(resolutionStatus);
      } else {
        resolutionStatus = this.RESOLVED_STATUS
        storedItem.resolve(data);
      }
      this.storage.delete(promiseId);
    }

    return resolutionStatus;
  }

  /**
   * Deletes the promise associated with the given promise ID.
   * @param {object} arg
   * @param {string} arg.promiseId - Unique ID for the promise.
   * @returns {void}
   */
  deletePromise({ promiseId }) {
    const storedItem = this.storage.get(promiseId);
    if (storedItem) {
      storedItem.reject(this.DELETED_STATUS);
      this.storage.delete(promiseId);
    }
  }
}

export default PromiseManager;
