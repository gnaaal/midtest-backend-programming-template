const groceriesService = require('./groceries-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of buyers request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getGroceries(request, response, next) {
  try {
    const groceries = await groceriesService.getGroceries();
    return response.status(200).json(groceries);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get buyer detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getGrocery(request, response, next) {
  try {
    const grocery = await groceriesService.getGrocery(request.params.id);

    if (!grocery) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown buyer');
    }

    return response.status(200).json(grocery);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create buyer request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createGrocery(request, response, next) {
  try {
    const name_product = request.body.name_product;
    const price_product = request.body.price_product;

    const success = await groceriesService.createGrocery(
      name_product,
      price_product
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create buyer'
      );
    }

    return response.status(200).json({ name_product, price_product });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update buyer request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateGrocery(request, response, next) {
  try {
    const id = request.params.id;
    const name_product = request.body.name_product;
    const price_product = request.body.price_product;

    const success = await groceriesService.updateGrocery(
      id,
      name_product,
      price_product
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update buyer'
      );
    }

    return response.status(200).json({ id, name_product, price_product });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteGrocery(request, response, next) {
  try {
    const id = request.params.id;

    const success = await groceriesService.deleteGrocery(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete buyer'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getGroceries,
  getGrocery,
  createGrocery,
  updateGrocery,
  deleteGrocery,
};
