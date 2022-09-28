import Brand from "../Models/brandModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";
import {uploadSingleImg} from "../Middlewares/ImgUploadMiddleware.js";
import sharp from "sharp";
import asyncHandler from "express-async-handler";
// Upload single image
export const uploadBrandImage = uploadSingleImg("image");

export const resizeBrandImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `brand-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`backend/uploads/brands/${filename}`);
  // Save image into our db
  req.body.image = filename;
  next();
});

// @desc    Create a new Brand
// @route   POST /api/brands
// @access  Private
export const createBrand = createOne(Brand);

// @desc    Update a Brand
// @route   PATCH /api/brands/:id
// @access  Private
export const updateBrand = updateOne(Brand);

// @desc    Delete a Brand
// @route   DELETE /api/brands/:id
// @access  Private
export const deleteBrand = deleteOne(Brand);

// @desc    Get All Brands
// @route   GET /api/brands
// @access  Public
export const getAllBrands = getAll(Brand);

// @desc    Get a Brand
// @route   GET /api/brands/:id
// @access  Public
export const getBrand = getOne(Brand);
