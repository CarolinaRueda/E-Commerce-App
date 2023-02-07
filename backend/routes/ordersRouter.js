const router = require("express").Router();
const {
  getOutOrders,
  getOutOrdersByID,
  updateOrder,
  deleteOrder,
  updateStatus,
} = require("../controllers/ordersController");

router.get("/:userId", getOutOrders);

router.route("/:id").get(getOutOrdersByID).put(updateOrder);

router.put("/:id/updateOrder/", updateStatus);

router.delete("/:id/cancel", deleteOrder);

module.exports = router;
