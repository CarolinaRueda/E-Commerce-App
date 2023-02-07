const GoogleStrategy = require("passport-google-oauth2").Strategy;
const pool = require("./db/dbConfig");
const { GOOGLE } = require("./config");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        scope: ["email", "profile"],
        clientID: GOOGLE.CLIEND_ID,
        clientSecret: GOOGLE.CLIENT_SECRET,
        callbackURL: GOOGLE.REDIRECT_URI,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const { _json } = profile;
          const userCheckQuery = await pool.query(
            "select * from users where google_id = $1",
            [_json.sub]
          );

          const userCheck = userCheckQuery.rowCount;

          if (!userCheck) {
            const userQuery = await pool.query(
              "insert into users (first_name, last_name, email, google_id) values ($1, $2, $3, $4) returning *",
              [_json.given_name, _json.family_name, _json.email, _json.sub]
            );

            const userId = userQuery.rows[0].id;
            const created = new Date().toISOString().split("T")[0];

            await pool.query(
              "insert into carts (created, user_id) values ($1, $2) returning *",
              [created, userId]
            );
          }

          return done(null, profile);
        } catch (err) {
          throw new Error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));
};
