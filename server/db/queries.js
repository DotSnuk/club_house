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
  console.log(rows.length !== 0);
  return rows.length !== 0;
}

module.exports = {
  getAllPosts,
  doesEmailExist,
};
