import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeBrandImage,
} from "../Controllers/brandController.js";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
  .post(
    protect,
    allowedTo("admin"),
    uploadBrandImage,
    resizeBrandImage,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(
    protect,
    allowedTo("admin"),
    uploadBrandImage,
    resizeBrandImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(protect, allowedTo("admin"), deleteBrandValidator, deleteBrand);

export default router;
