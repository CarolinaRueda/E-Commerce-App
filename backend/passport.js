const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./db/dbConfig");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = (
            await pool.query("select * from users where email = $1", [email])
          ).rows[0];

          if (!user) {
            console.log("User not found");
            return done(null, false);
          }

          bcrypt.compare(password, user.password, (err, res) => {
            if (err) throw err;

            if (res) {
              console.log("All done");
              return done(null, user);
            } else {
              console.log("The password is incorrect");
              return done(null, false);
            }
          });
        } catch (err) {
          throw err;
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = (await pool.query("Select * from users where id = $1", [id]))
        .rows[0];

      return done(null, user);
    } catch (err) {
      throw err;
    }
  });
};
