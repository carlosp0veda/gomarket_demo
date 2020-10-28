const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts
} = require("../controllers/productController");
const { verifyJWT, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch all products
router.route("/").get(getProducts).post(verifyJWT, isAdmin, createProduct);
router.route("/:id/reviews").post(verifyJWT, createReview);
router.get('/top', getTopProducts)

router
  .route("/:id")
  .get(getProductById)
  .delete(verifyJWT, isAdmin, deleteProduct)
  .put(verifyJWT, isAdmin, updateProduct);

module.exports = router;
