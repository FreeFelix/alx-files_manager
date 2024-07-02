import { existsSync, readFileSync } from 'fs';

/**
 * Loads the appropriate environment variables based on the current npm lifecycle event.
 * If the event name includes 'test' or 'cover', it loads variables from the '.env.test' file.
 * Otherwise, it loads variables from the '.env' file.
 */
const envLoader = () => {
  // Determine the current npm lifecycle event, defaulting to 'dev' if not specified
  const env = process.env.npm_lifecycle_event || 'dev';

  // Choose the correct environment file based on the event
  const path = env.includes('test') || env.includes('cover') ? '.env.test' : '.env';

  // Check if the environment file exists
  if (existsSync(path)) {
    // Read the contents of the environment file
    const data = readFileSync(path, 'utf-8').trim().split('\n');

    // Parse each line of the environment file
    for (const line of data) {
      // Find the position of the delimiter (equals sign) in the line
      const delimPosition = line.indexOf('=');

      // Extract the variable name and value from the line
      const variable = line.substring(0, delimPosition);
      const value = line.substring(delimPosition + 1);

      // Set the environment variable
      process.env[variable] = value;
    }
  }
};

export default envLoader;
