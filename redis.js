import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    // Create a new Redis client
    this.client = createClient();
    this.isClientConnected = true;

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });

    // Handle successful connection
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean} True if the connection is active, false otherwise.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object} The value of the key.
   */
  async get(key) {
    // Use promisify to convert the callback-based GET method to a promise-based one
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async set(key, value, duration) {
    // Use promisify to convert the callback-based SETEX method to a promise-based one
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async del(key) {
    // Use promisify to convert the callback-based DEL method to a promise-based one
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

// Export an instance of RedisClient
export const redisClient = new RedisClient();
export default redisClient;
