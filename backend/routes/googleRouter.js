const {
  googleAuth,
  googleRedirect,
  googleSuccess,
} = require("../controllers/googleController");

const router = require("express").Router();

router.get("/", googleAuth);

router.get("/redirect", googleRedirect);

router.get("/success", googleSuccess);

module.exports = router;
