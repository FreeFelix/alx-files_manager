/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1'; // Importing sha1 for password hashing
import Queue from 'bull/lib/queue'; // Importing Queue from Bull library for background jobs
import dbClient from '../utils/db'; // Importing database client utility

// Initialize a queue for email sending jobs
const userQueue = new Queue('email sending');

// Define UsersController class
export default class UsersController {
  /**
   * Creates a new user.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null; // Extract email from request body
    const password = req.body ? req.body.password : null; // Extract password from request body

    // Check if email or password is missing
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }

    // Check if user with the same email already exists
    const user = await (await dbClient.usersCollection()).findOne({ email });
    if (user) {
      res.status(400).json({ error: 'Already exists' });
      return;
    }

    // Insert the new user into the database with hashed password
    const insertionInfo = await (await dbClient.usersCollection()).insertOne({
      email,
      password: sha1(password), // Hashing the password using sha1 (not recommended for production)
    });
    const userId = insertionInfo.insertedId.toString(); // Get the inserted user's ID

    // Add a job to the email sending queue for this user
    userQueue.add({ userId });

    // Respond with success and user information
    res.status(201).json({ email, id: userId });
  }

  /**
   * Retrieves information about the current user.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static async getMe(req, res) {
    const { user } = req; // Get the user from request context

    // Respond with user's email and ID
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
