/* eslint-disable import/no-named-as-default */

// Import UUID generator and Redis client utility
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

/**
 * Controller handling authentication endpoints.
 */
export default class AuthController {
  /**
   * Handles GET request to establish user connection and generate a token.
   * @param {import('express').Request} req The Express request object.
   * @param {import('express').Response} res The Express response object.
   */
  static async getConnect(req, res) {
    const { user } = req; // Extract user object from request
    const token = uuidv4(); // Generate a unique token

    // Store token in Redis with user ID as value, valid for 24 hours
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    
    // Respond with status 200 and JSON containing the generated token
    res.status(200).json({ token });
  }

  /**
   * Handles GET request to disconnect user by removing token from Redis.
   * @param {import('express').Request} req The Express request object.
   * @param {import('express').Response} res The Express response object.
   */
  static async getDisconnect(req, res) {
    const token = req.headers['x-token']; // Retrieve token from request headers

    // Remove token from Redis
    await redisClient.del(`auth_${token}`);
    
    // Respond with status 204 (No Content) to indicate successful disconnection
    res.status(204).send();
  }
}
