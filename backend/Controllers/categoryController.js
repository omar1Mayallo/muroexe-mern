import Category from "../Models/categoryModel.js";
import {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";
import {uploadSingleImg} from "../Middlewares/ImgUploadMiddleware.js";
import sharp from "sharp";
import asyncHandler from "express-async-handler";
// Upload single image
export const uploadCategoryImage = uploadSingleImg("image");

export const resizeCategoryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `category-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`backend/uploads/categories/${filename}`);
  // Save image into our db
  req.body.image = filename;
  next();
});
// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = createOne(Category);

// @desc    Update a category
// @route   PATCH /api/categories/:id
// @access  Private
export const updateCategory = updateOne(Category);

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = deleteOne(Category);

// @desc    Get All Categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = getAll(Category);
// @desc    Get a category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = getOne(Category);
