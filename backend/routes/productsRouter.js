const router = require("express").Router();
const {
  getOutProducts,
  getOutProductsByID,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.route("/").get(getOutProducts).post(addNewProduct);

router
  .route("/:id")
  .get(getOutProductsByID)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
