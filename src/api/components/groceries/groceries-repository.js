const { Grocery } = require('../../../models');

/**
 * Get a list of buyers
 * @returns {Promise}
 */
async function getGroceries() {
  return Grocery.find({});
}

/**
 * Get buyers detail
 * @param {string} id - buyers ID
 * @returns {Promise}
 */
async function getGrocery(id) {
  return Grocery.findById(id);
}

/**
 * Create new buyers
 * @param {string} name_product - Product Name
 * @param {number} price_product - Product Price
 * @returns {Promise}
 */
async function createGrocery(name_product, price_product) {
  return Grocery.create({
    name_product,
    price_product,
  });
}

/**
 * Update existing buyers
 * @param {string} name_product - Product Name
 * @param {number} price_product - Product Price
 * @returns {Promise}
 */
async function updateGrocery(id, name_product, price_product) {
  return Grocery.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name_product,
        price_product,
      },
    }
  );
}

/**
 * Delete a buyer
 * @param {string} id - Buyer ID
 * @returns {Promise}
 */
async function deleteGrocery(id) {
  return Grocery.deleteOne({ _id: id });
}

module.exports = {
  getGroceries,
  getGrocery,
  createGrocery,
  updateGrocery,
  deleteGrocery,
};
