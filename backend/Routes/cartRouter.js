import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getUserCart,
  clearCart,
  applyCoupon,
} from "../Controllers/cartController.js";
const router = express.Router();

router.use(protect, allowedTo("user"));

router.route("/").post(addToCart).get(getUserCart).delete(clearCart);

router.patch("/applyCoupon", applyCoupon);

router
  .route("/:productId")
  .patch(updateCartItemQuantity)
  .delete(removeFromCart);

export default router;
