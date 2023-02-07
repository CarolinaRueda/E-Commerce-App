const router = require("express").Router();
const {
  checkOut,
  getCheckout,
  checkoutStripe,
} = require("../controllers/checkoutController");

router.route("/").get(getCheckout).post(checkoutStripe);

router.post("/cart/:cartId", checkOut);

module.exports = router;
