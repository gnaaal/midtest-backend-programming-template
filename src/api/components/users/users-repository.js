const { User } = require('../../../models');

/**
 * Get a list of users
 *
 * @param {string} SORTING_OP # Operasi SORTING_OP
 * @param {string} SEARCH_OP # operasi search
 * @param {integer} PAGE_NUM # Nomor Halaman
 * @param {integer} PAGE_SZ # Size halaman
 * @returns {Promise}
 */

async function getUsers(PAGE_NUM, PAGE_SZ, SORTING_OP, SEARCH_OP) {
  try {
    let query = {};

    if (SEARCH_OP) {
      //Function untuk melalukan OPERASI SEARCH
      const [FIELD, VALUE] = SEARCH_OP.split(':');
      if (FIELD && VALUE) {
        query = {
          [FIELD]: { $regex: VALUE, $options: 'i' },
        };
      }
    }

    const countTOTAL = await User.countDocuments(query); //

    let SORTCRIT;
    if (SORTING_OP === 'desc') {
      SORTCRIT = { name: -1 };
    } else {
      SORTCRIT = { name: 1 };
    }

    if (SORTING_OP.includes(':desc')) {
      const [Namefield, orders] = SORTING_OP.split(' : ');
      if (Namefield === 'name' || Namefield === 'email') {
        SORTCRIT = { [Namefield]: -1 };
      }
    }

    // GET DATA DARI DATABASE
    let users;
    if (PAGE_SZ === 0) {
      users = await User.find(query).sort(SORTCRIT);
    } else {
      users = await User.find(query)
        .sort(SORTCRIT)
        .limit(PAGE_SZ)
        .skip(PAGE_NUM - 1);
    }
    const pageTOTAL = Math.ceil(countTOTAL / PAGE_SZ);
    const has_previous_page = PAGE_NUM > 1;
    const has_next_page = PAGE_SZ < pageTOTAL;

    return {
      page_number: PAGE_NUM,
      page_size: PAGE_SZ,
      page_total: pageTOTAL,
      has_previous_page: has_previous_page,
      has_next_page: has_next_page,
      data: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at,
      })),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}
/**Tambahan Function menghitung total user
 * @returns {Promise}
 */
async function countUsers() {
  return User.countDocuments({});
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  countUsers,
};
