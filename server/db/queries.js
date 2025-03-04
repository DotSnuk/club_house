const pool = require('./pool');

async function getAllPosts() {
  const { rows } = await pool.query(`SELECT * FROM posts`);
  return rows;
}

async function doesEmailExist(email) {
  const { rows } = await pool.query(
    `SELECT email FROM users WHERE email = $1`,
    [email],
  );
  return rows.length !== 0;
}

async function createUser(data) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, email, passwordhash, salt) VALUES ($1, $2, $3, $4, $5)`,
    [data.firstname, data.lastname, data.email, data.passwordhash, data.salt],
  );
}

async function getPasswordAndSalt(email) {
  const { rows } = await pool.query(
    `SELECT passwordhash, salt FROM users WHERE email = $1`,
    [email],
  );
  return rows;
}

module.exports = {
  getAllPosts,
  doesEmailExist,
  createUser,
  getPasswordAndSalt,
};
