import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} from "../Controllers/categoryController.js";
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidators.js";
import subCategoryRouter from "./subCategoryRouter.js";

const router = express.Router();

//Nested route to Get all SubCategories that belong to specific category
router.use("/:categoryId/subcategories", subCategoryRouter);

router
  .route("/")
  .get(getAllCategories)
  .post(
    protect,
    allowedTo("admin"),
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .patch(
    protect,
    allowedTo("admin"),
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(protect, allowedTo("admin"), deleteCategoryValidator, deleteCategory);

export default router;
