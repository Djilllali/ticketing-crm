const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');
const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plainPassword, saltRounds));
  });
};
const checkPassword = (guestPassword, dbUserPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.compare(guestPassword, dbUserPassword));
  });
};
module.exports = {
  hashPassword,
  checkPassword,
};
