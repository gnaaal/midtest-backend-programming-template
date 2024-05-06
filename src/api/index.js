const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const groceries = require('./components/groceries/groceries-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  groceries(app);

  return app;
};
