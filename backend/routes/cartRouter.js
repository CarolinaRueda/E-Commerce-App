const router = require("express").Router();
const {
  getOutCarts,
  getOutCartByID,
  addNewCart,
  updateCart,
  deleteCart,
  deleteOneItem,
  getProductsByCart,
  getCartId,
  addOneItem,
  deleteAllItems,
} = require("../controllers/cartController");
const { checkOut } = require("../controllers/checkoutController");

router.route("/cart").get(getOutCarts).post(addNewCart);

router.route("/cart/:userId").get(getCartId);

router.route("/cart/:cartId/:userId").post(addOneItem).delete(deleteAllItems);

router.delete("/cart/:cartId/item/:productId", deleteOneItem);

router.route("/cart/:cartId").get(getOutCartByID).delete(deleteCart);

router.get("/cart/:cartId/items", getProductsByCart);

router.post("/cart/:cartId/checkout", checkOut);

router.post("/:userId/cart/:cartId", updateCart);

module.exports = router;
