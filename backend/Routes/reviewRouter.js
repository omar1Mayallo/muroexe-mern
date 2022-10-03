import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setProductIdUserIdToBody,
  filteredObj,
} from "../Controllers/reviewController.js";
import {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} from "../utils/validators/reviewValidator.js";

const router = express.Router({mergeParams: true});

//Nested Routes
//POST /products/:productId/reviews ==>> createReview for specific Product
//GET /products/:productId/reviews ==>> getAllReviews for specific Product

router
  .route("/")
  .get(filteredObj, getAllReview)
  .post(
    protect,
    allowedTo("admin", "user"),
    setProductIdUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .patch(
    protect,
    allowedTo("admin", "user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    protect,
    allowedTo("admin", "user"),
    deleteReviewValidator,
    deleteReview
  );

export default router;
