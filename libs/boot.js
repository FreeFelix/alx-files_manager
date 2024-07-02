import envLoader from '../utils/env_loader'; // Importing environment loader utility

// Function to start the server
const startServer = (api) => {
  envLoader(); // Load environment variables from .env file

  // Define the port to listen on, defaulting to 5000 if not specified in environment
  const port = process.env.PORT || 5000;

  // Determine the environment (development, production, etc.) based on npm lifecycle event
  const env = process.env.npm_lifecycle_event || 'dev';

  // Start listening on the specified port
  api.listen(port, () => {
    console.log(`[${env}] API has started listening at port:${port}`);
  });
};

export default startServer; // Export the startServer function
