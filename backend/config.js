require("dotenv").config();

module.exports = {
  SERVER_SECRET: process.env.SERVER_SECRET,
  PORT: process.env.PORT || 3000,
  DB: {
    USER: process.env.DBUSER,
    HOST: process.env.DBHOST,
    NAME: process.env.DBNAME,
    PASSWORD: process.env.DBPASSWORD,
    PORT: process.env.DBPORT,
  },
  GOOGLE: {
    CLIEND_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  },
};
