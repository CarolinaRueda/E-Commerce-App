//
const express = require("express"),
  app = express(),
  session = require("express-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  { SERVER_SECRET, PORT } = require("./config"),
  cors = require("cors");
const indexRouter = require("./routes");
const cookieParser = require("cookie-parser");

//*Passport and google initialization
require("./googlePassport")(passport);
require("./passport")(passport);

// *Server Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// *Session Setup
app.use(
  session({
    secret: SERVER_SECRET,
    cookie: {
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    sameSite: "none",
  })
);

// *Parse cookie
app.use(cookieParser(SERVER_SECRET));

// *Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// *User section
app.use(indexRouter);

// *Server start
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
