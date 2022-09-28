import SubCategory from "../Models/subCategoryModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";

//For Nested Routes
export const setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
//For Nested Routes
export const filteredObj = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) filter = {category: req.params.categoryId};
  req.filterObj = filter;
  next();
};

// @desc    Create a new Subcategory
// @route   POST /api/subcategories
// @access  Private
export const createSubCategory = createOne(SubCategory);

// @desc    Update a Subcategory
// @route   PATCH /api/subcategories/:id
// @access  Private
export const updateSubCategory = updateOne(SubCategory);

// @desc    Delete a Subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private
export const deleteSubCategory = deleteOne(SubCategory);

// @desc    Get All SubCategories
// @route   GET /api/subcategories
// @access  Public
export const getAllSubCategories = getAll(SubCategory);

// @desc    Get a SubCategory
// @route   GET /api/subcategories/:id
// @access  Public
export const getSubCategory = getOne(SubCategory);
