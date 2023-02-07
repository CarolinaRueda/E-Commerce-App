const router = require("express").Router();
const {
  getRegister,
  checkDuplicate,
  addUser,
} = require("../controllers/registerController");
const { isAuthenticate } = require("../middleware/auth");

router
  .route("/")
  .get(isAuthenticate, getRegister)
  .post(checkDuplicate, addUser);

module.exports = router;
