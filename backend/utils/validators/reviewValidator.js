import {request} from "express";
import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import Review from "../../Models/reviewModel.js";

export const getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const createReviewValidator = [
  check("review")
    .notEmpty()
    .withMessage("Rating is required")
    .isLength({min: 4})
    .withMessage("Rating text minimum length 4 characters")
    .isLength({max: 50})
    .withMessage("Rating text maximum length 50 characters"),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({min: 1, max: 5})
    .withMessage("Rating value must be between 1 to 5"),
  check("user").isMongoId().withMessage("Invalid user Id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid product Id format")
    .custom(async (val, {req}) => {
      //Check if the current user created review before
      const userReviewedBefore = await Review.findOne({
        user: req.user._id,
        product: req.body.product,
      });
      if (userReviewedBefore) {
        throw new Error("You already have a review for this product");
      }
      return true;
    }),
  validatorMiddleware,
];

export const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review Id format")
    .custom(async (val, {req}) => {
      //Check if the Review belong to the current user
      // 1) Check the Id
      const selectedReview = await Review.findById(val);
      if (!selectedReview) {
        throw new Error("This Id not matching any review");
      }
      // 2) Check the review ownership
      if (selectedReview.user._id.toString() !== req.user._id.toString()) {
        throw new Error("You are not allowed to update this review");
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Id format")
    .custom(async (val, {req}) => {
      //Check if the Review belong to the current user
      //The user allowed to delete his review , but admin can delete any review
      if (req.user.role === "user") {
        // 1) Check the Id
        const selectedReview = await Review.findById(val);
        if (!selectedReview) {
          throw new Error("This Id not matching any review");
        }
        // 2) Check the review ownership
        if (selectedReview.user._id.toString() !== req.user._id.toString()) {
          throw new Error("You are not allowed to delete this review");
        }
      }

      return true;
    }),
  validatorMiddleware,
];
