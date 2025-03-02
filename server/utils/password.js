const bcrypt = require('bcryptjs');

async function genHash(password, salt) {
  return await bcrypt.hash(password, salt);
}

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const passwordhash = await genHash(password, salt);
  return { passwordhash, salt };
}

async function comparePassword(providedPassword, email) {
  // get salt and hashedPassword stored in db
  // compare the hashedPassword with the return value from
  // genHash with providedPassword and the salt from the db
}

module.exports = {
  genPassword,
};
