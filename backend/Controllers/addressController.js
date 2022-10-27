import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get user addresses
// @route   GET /api/addresses
// @access  Private/user
export const getUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");
  res.status(200).json({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Private/user
export const createAddress = asyncHandler(async (req, res, next) => {
  //$addToSet => The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {addresses: req.body},
    },
    {new: true}
  );

  res.status(200).json({
    status: "success",
    message: "Address added successfully",
    data: user.addresses,
  });
});

// @desc    Create a new address
// @route   DELETE /api/addresses/:id
// @access  Private/user
export const removeAddress = asyncHandler(async (req, res, next) => {
  // $pull => The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {addresses: {_id: req.params.addressId}},
    },
    {new: true}
  );

  res.status(200).json({
    status: "success",
    message: "Address removed successfully",
    data: user.addresses,
  });
});
