import Coupon from "../Models/couponModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";

// @desc    Create a new Coupon
// @route   POST /api/coupons
// @access  Private/admin
export const createCoupon = createOne(Coupon);

// @desc    Update a Coupon
// @route   PATCH /api/coupons/:id
// @access  Private/admin
export const updateCoupon = updateOne(Coupon);

// @desc    Delete a Coupon
// @route   DELETE /api/coupons/:id
// @access  Private/admin
export const deleteCoupon = deleteOne(Coupon);

// @desc    Get All Coupons
// @route   GET /api/coupons
// @access  Private/admin
export const getAllCoupons = getAll(Coupon);

// @desc    Get a Coupon
// @route   GET /api/coupons/:id
// @access  Private/admin
export const getCoupon = getOne(Coupon);
