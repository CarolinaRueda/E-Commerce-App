const pool = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const getRegister = (req, res) => {
  res.json("Enter your info");
};

const checkDuplicate = async (req, res, next) => {
  const { email } = req.body;

  const text = "Select * from users where email = $1";
  const values = [email];

  try {
    const check = await (await pool.query(text, values)).rowCount;
    if (check) {
      res.redirect("/login");
    } else {
      return next();
    }
  } catch (err) {
    throw err;
  }
};

const addUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const text =
    "insert into users (first_name, last_name, email, password) values($1, $2, $3, $4) RETURNING *";
  const values = [first_name, last_name, email, hashedPass];

  try {
    const user = await pool.query(text, values);

    const userData = user.rows[0];
    res.json({
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    }); // => para que el frontend tome correctamente la informacion
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getRegister,
  checkDuplicate,
  addUser,
};
