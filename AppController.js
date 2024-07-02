/* eslint-disable import/no-named-as-default */

// Import Redis client and DB client utilities
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

/**
 * Controller handling application status and statistics endpoints.
 */
export default class AppController {
  /**
   * Handles GET request to retrieve status of Redis and DB clients.
   * @param {import('express').Request} req The Express request object.
   * @param {import('express').Response} res The Express response object.
   */
  static getStatus(req, res) {
    // Return status 200 with JSON response containing Redis and DB connection status
    res.status(200).json({
      redis: redisClient.isAlive(), // Check if Redis client is connected
      db: dbClient.isAlive(), // Check if DB client is connected
    });
  }

  /**
   * Handles GET request to retrieve statistics (number of users and files).
   * @param {import('express').Request} req The Express request object.
   * @param {import('express').Response} res The Express response object.
   */
  static getStats(req, res) {
    // Use Promise.all to execute both nbUsers and nbFiles asynchronously
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        // Return status 200 with JSON response containing number of users and files
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
