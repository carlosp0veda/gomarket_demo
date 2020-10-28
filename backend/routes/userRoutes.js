const express = require("express");
const {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { verifyJWT, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch all products
router.route("/").post(createUser).get(verifyJWT, isAdmin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(verifyJWT, getUserProfile)
  .put(verifyJWT, updateUserProfile);

router
  .route("/:id/")
  .delete(verifyJWT, isAdmin, deleteUser)
  .get(verifyJWT, isAdmin, getUserById)
  .put(verifyJWT, isAdmin, updateUser);

module.exports = router;
