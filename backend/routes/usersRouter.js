const router = require("express").Router();
const {
  getOutUsers,
  getOutUsersByID,
  deleteUser,
  updatePassword,
} = require("../controllers/usersController");

router.get("/", getOutUsers);

router
  .route("/:userId")
  .get(getOutUsersByID)
  .put(updatePassword)
  .delete(deleteUser);

module.exports = router;
