import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} from "../Controllers/wishlistController.js";

const router = express.Router();

router.use(protect, allowedTo("admin", "user"));

router.route("/").post(addToWishlist).get(getUserWishlist);

router.delete("/:productId", removeFromWishlist);

export default router;
