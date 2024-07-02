/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */

import sha1 from 'sha1';
import { Request } from 'express';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

/**
 * Fetches the user from the Authorization header in the given request object.
 * The Authorization header should be in the format 'Basic base64encodedemail:password'.
 * 
 * @param {Request} req - The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}> | null} 
 *          Returns a Promise that resolves to a user object if the credentials are valid,
 *          or null if the credentials are invalid or missing.
 */
export const getUserFromAuthorization = async (req) => {
  // Get the Authorization header from the request
  const authorization = req.headers.authorization || null;

  // Return null if the Authorization header is missing
  if (!authorization) {
    return null;
  }

  // Split the Authorization header into two parts: 'Basic' and the base64 encoded credentials
  const authorizationParts = authorization.split(' ');

  // Return null if the Authorization header is not in the correct format
  if (authorizationParts.length !== 2 || authorizationParts[0] !== 'Basic') {
    return null;
  }

  // Decode the base64 encoded credentials
  const token = Buffer.from(authorizationParts[1], 'base64').toString();
  const sepPos = token.indexOf(':');
  const email = token.substring(0, sepPos);
  const password = token.substring(sepPos + 1);

  // Fetch the user from the database using the email
  const user = await (await dbClient.usersCollection()).findOne({ email });

  // Return null if the user is not found or the password is incorrect
  if (!user || sha1(password) !== user.password) {
    return null;
  }

  // Return the user object if the credentials are valid
  return user;
};

/**
 * Fetches the user from the X-Token header in the given request object.
 * The X-Token header should contain a token that maps to a user ID stored in Redis.
 * 
 * @param {Request} req - The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}> | null} 
 *          Returns a Promise that resolves to a user object if the token is valid,
 *          or null if the token is invalid or missing.
 */
export const getUserFromXToken = async (req) => {
  // Get the token from the X-Token header
  const token = req.headers['x-token'];

  // Return null if the token is missing
  if (!token) {
    return null;
  }

  // Fetch the user ID from Redis using the token
  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) {
    return null;
  }

  // Fetch the user from the database using the user ID
  const user = await (await dbClient.usersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });

  // Return the user object if found, or null if not found
  return user || null;
};

// Export the functions as the default export
export default {
  getUserFromAuthorization: async (req) => getUserFromAuthorization(req),
  getUserFromXToken: async (req) => getUserFromXToken(req),
};
