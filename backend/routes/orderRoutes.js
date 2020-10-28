const express = require("express");
const {
  addOrder,
  getOrderById,
  updateOrderPayment,
  getUserOrders,
  getAllOrders,
  updateOrderDelivery,
} = require("../controllers/orderController");
const { verifyJWT, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add order
router
  .route("/")
  .post(verifyJWT, addOrder)
  .get(verifyJWT, isAdmin, getAllOrders);
router.route("/userorders").get(verifyJWT, getUserOrders);
router.route("/:id").get(verifyJWT, getOrderById);
router.route("/:id/pay").put(verifyJWT, updateOrderPayment);
router.route("/:id/deliver").put(verifyJWT, isAdmin, updateOrderDelivery);

module.exports = router;
