import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   * Initializes the MongoDB client and connects to the database.
   */
  constructor() {
    // Load environment variables from .env file
    envLoader();
    
    // Get MongoDB connection parameters from environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    // Initialize the MongoDB client
    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    
    // Connect to the MongoDB server
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean} True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<number>} A promise that resolves to the number of users.
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<number>} A promise that resolves to the number of files.
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>} A promise that resolves to the users collection.
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>} A promise that resolves to the files collection.
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

// Export an instance of DBClient
export const dbClient = new DBClient();
export default dbClient;
