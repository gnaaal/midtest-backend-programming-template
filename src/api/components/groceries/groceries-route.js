const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const groceriesControllers = require('./groceries-controller');
const groceriesValidator = require('./groceries-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/groceries', route);

  // Get list of groceries
  route.get('/', authenticationMiddleware, groceriesControllers.getGroceries);

  // Create Grocery
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(groceriesValidator.createGrocery),
    groceriesControllers.createGrocery
  );

  // Get Grocery detail
  route.get('/:id', authenticationMiddleware, groceriesControllers.getGrocery);

  // Update Grocery
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(groceriesValidator.updateGrocery),
    groceriesControllers.updateGrocery
  );

  // Delete Grocery
  route.delete(
    '/:id',
    authenticationMiddleware,
    groceriesControllers.deleteGrocery
  );
};
