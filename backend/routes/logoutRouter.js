const router = require("express").Router();
const { logout } = require("../controllers/logoutController");

router.get("/", logout);

module.exports = router;
