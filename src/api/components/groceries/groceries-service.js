const groceriesRepository = require('./groceries-repository');

/**
 * Get list of buyers
 * @returns {Array}
 */
async function getGroceries() {
  const groceries = await groceriesRepository.getGroceries();

  const results = [];
  for (let i = 0; i < groceries.length; i += 1) {
    const grocery = groceries[i];
    results.push({
      id: grocery.id,
      name_product: grocery.name_product,
      price_product: grocery.price_product,
    });
  }

  return results;
}

/**
 * Get buyers detail
 * @param {string} id - buyer ID
 * @returns {Object}
 */
async function getGrocery(id) {
  const grocery = await groceriesRepository.getGrocery(id);

  // User not found
  if (!grocery) {
    return null;
  }

  return {
    id: grocery.id,
    name_product: grocery.name_product,
    price_product: grocery.price_product,
  };
}

/**
 * Create new buyers
 * @param {string} name_product - Product Name
 * @param {number} price_product
 * @returns {boolean}
 */
async function createGrocery(name_product, price_product) {
  try {
    await groceriesRepository.createGrocery(name_product, price_product);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing buyers
 * @param {string} id - Buyer ID
 * @param {string} name_product - Product Name
 * @param {number} price_product - Product Price
 * @returns {boolean}
 */
async function updateGrocery(id, name_product, price_product) {
  const grocery = await groceriesRepository.getGrocery(id);

  // User not found
  if (!grocery) {
    return null;
  }

  try {
    await groceriesRepository.updateGrocery(id, name_product, price_product);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete buyers
 * @param {string} id - Buyer ID
 * @returns {boolean}
 */
async function deleteGrocery(id) {
  const grocery = await groceriesRepository.getGrocery(id);

  // User not found
  if (!grocery) {
    return null;
  }

  try {
    await groceriesRepository.deleteGrocery(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getGroceries,
  getGrocery,
  createGrocery,
  updateGrocery,
  deleteGrocery,
};
