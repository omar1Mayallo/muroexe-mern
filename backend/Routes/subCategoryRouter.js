import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  getAllSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryToBody,
  filteredObj,
} from "../Controllers/subCategoryController.js";
import {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validators/subCategoryValidators.js";

const router = express.Router({mergeParams: true});

router
  .route("/")
  .get(filteredObj, getAllSubCategories)
  .post(
    protect,
    allowedTo("admin"),
    setCategoryToBody,
    createSubCategoryValidator,
    createSubCategory
  );
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(
    protect,
    allowedTo("admin"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

export default router;
