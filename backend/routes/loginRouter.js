const router = require("express").Router();
const passport = require("passport");
const { loginSuccess } = require("../controllers/loginController");

router.post("/", passport.authenticate("local"), loginSuccess);

module.exports = router;
