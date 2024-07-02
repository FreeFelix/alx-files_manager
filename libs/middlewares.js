import express from 'express';

/**
 * Adds middlewares to the given express application.
 * @param {express.Express} api The express application.
 */
const injectMiddlewares = (api) => {
  // Middleware to parse incoming JSON requests with a limit of '200mb'
  api.use(express.json({ limit: '200mb' }));
};

export default injectMiddlewares;
