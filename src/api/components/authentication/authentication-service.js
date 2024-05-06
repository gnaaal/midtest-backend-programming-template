const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

const Percobaan_Login_Max = 5;
const Block_Timeout = 30 * 60 * 1000; // 30 menit dalam milidetik
const Login_Gagal = {};

async function Histori_Kegagalan_Login(email) {
  if (!Login_Gagal[email]) {
    Login_Gagal[email] = { count: 1, percobaan_Terakhir: Date.now() };
  } else {
    Login_Gagal[email].count++;
    Login_Gagal[email].percobaan_Terakhir = Date.now();
  }
}

async function resetLogin_Gagal(email) {
  delete Login_Gagal[email];
}

async function getLogin_Gagal(email) {
  return Login_Gagal[email] ? Login_Gagal[email].count : 0;
}
async function isLoginWindowExpired(email) {
  if (!Login_Gagal[email]) {
    return true;
  }

  const percobaan_Terakhir = Login_Gagal[email].percobaan_Terakhir;
  return Date.now() - percobaan_Terakhir > Block_Timeout;
}

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    await resetLogin_Gagal(email);

    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  } else {
    // Menyimpan percobaaan login yang gagal
    await Histori_Kegagalan_Login(email);

    const failed_Attempt = await getLogin_Gagal(email);
    if (failed_Attempt >= Percobaan_Login_Max) {
      throw new Error('Too many failed login attempts');
    }

    return null;
  }
}
module.exports = {
  checkLoginCredentials,
};
