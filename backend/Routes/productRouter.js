import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  topSevenSales,
  topSevenLatest,
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImages,
  resizeProductImages,
} from "../Controllers/productController.js";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validators/productValidator.js";
import reviewRouter from "./reviewRouter.js";

const router = express.Router();

//NESTED ROUTER (REVIEWS)
router.use("/:productId/reviews", reviewRouter);

router.route("/top-7-sales").get(topSevenSales, getAllProducts);
router.route("/top-7-latest-products").get(topSevenLatest, getAllProducts);

router
  .route("/")
  .get(getAllProducts)
  .post(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo("admin"), deleteProductValidator, deleteProduct);

export default router;
