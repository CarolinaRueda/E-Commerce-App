const passport = require("passport");
const pool = require("../db/dbConfig");

// /google GET
const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

// google/redirect GET
const googleRedirect = passport.authenticate("google", {
  successRedirect: "/google/success",
});

// google/success GET
const googleSuccess = async (req, res) => {
  const { _json } = req.user;

  const userIdQuery = await pool.query(
    "select * from users where google_id = $1",
    [_json.sub]
  );

  const user = {
    id: userIdQuery.rows[0].id,
    first_name: _json.given_name,
    last_name: _json.family_name,
    email: _json.email,
    picture: _json.picture,
  };

  res.cookie("user", JSON.stringify(user));
  res.redirect("http://localhost:3000/");
};

module.exports = {
  googleAuth,
  googleRedirect,
  googleSuccess,
};
