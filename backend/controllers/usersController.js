const pool = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const getOutUsers = async (req, res) => {
  try {
    const users = await pool.query("select * from users");
    res.send(users.rows);
  } catch (err) {
    throw err;
  }
};

const getOutUsersByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("select * from where id = $1", [id]);
    res.send(user.rows[0]);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  const cases = {
    1: {
      query: "UPDATE users SET first_name = $1 WHERE id = $2 RETURNING *",
      values: [first, id],
    },
    2: {
      query: "UPDATE users SET last_name = $1 WHERE id = $2 RETURNING *",
      values: [last, id],
    },
    3: {
      query:
        "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *",
      values: [first, last, id],
    },
  };

  try {
    if (first_name && !last_name) {
      await pool.query(cases[1].query, cases[1].values);
      res.send(`user updated, new values ${first_name}`);
    }
    if (!first_name && last_name) {
      await pool.query(cases[2].query, cases[2].values);
      res.send(`user updated, new values ${last_name}`);
    }
    if (first_name && last_name) {
      await pool.query(cases[3].query, cases[3].values);
      res.send(`user updated, new values ${first_name} | ${last_name}`);
    }
    res.redirect(`/users/${id}`);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("delete from users where id = $1", [id]);
    res.send(`Deleted user with ID: ${id}`);
  } catch (err) {
    throw err;
  }
};

// users/:userId
const updatePassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { password, password2 } = req.body.passwords;

  if (!password || !password2) {
    throw new Error("Please supply both passwords");
  }
  if (password !== password2) {
    throw new Error("Passwords doesn't match, please try again");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateQuery = await pool.query(
      "update users set password = $1 where id = $2 returning *",
      [hashedPassword, userId]
    );
    const check = !!updateQuery.rowCount;
    res.json({ check });
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = {
  getOutUsers,
  getOutUsersByID,
  updateUser,
  deleteUser,
  updatePassword,
};
