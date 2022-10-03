import Review from "../Models/reviewModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";

//NESTED ROUTES
// 1) For (CREATE) review for specific product
export const setProductIdUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// 2) For (GET) reviews for specific product
export const filteredObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = {product: req.params.productId};
  req.filterObj = filterObject;
  next();
};

// @desc    Create a new Review
// @route   POST /api/reviews
// @access  Private
export const createReview = createOne(Review);

// @desc    Update a Review
// @route   PATCH /api/reviews/:id
// @access  Private
export const updateReview = updateOne(Review);

// @desc    Delete a Review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = deleteOne(Review);

// @desc    Get All Reviews
// @route   GET /api/reviews
// @access  Public
export const getAllReview = getAll(Review);

// @desc    Get a Review
// @route   GET /api/reviews/:id
// @access  Public
export const getReview = getOne(Review);
