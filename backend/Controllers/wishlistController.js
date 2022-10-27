import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";

// // @desc    Create a new wishlist item
// // @route   POST /api/wishlist
// // @access  Private/user
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {wishlist: req.body.productId},
    },
    {new: true}
  );

  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist.",
    data: user.wishlist,
  });
});
// // @desc    remove from wishlist
// // @route   DELETE /api/wishlist/:id
// // @access  Private/user
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {wishlist: req.params.productId},
    },
    {new: true}
  );

  res.status(200).json({
    status: "success",
    message: "Product removed successfully from your wishlist.",
    data: user.wishlist,
  });
});

// // @desc    Get user wishlist
// // @route   GET /api/wishlist
// // @access  Private/user
export const getUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
