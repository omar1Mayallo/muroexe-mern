import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
} from "../Controllers/couponController.js";

const router = express.Router();

router.use(protect, allowedTo("admin"));

router.route("/").get(getAllCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).patch(updateCoupon).delete(deleteCoupon);

export default router;
