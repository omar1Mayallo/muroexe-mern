import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import slugify from "slugify";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({min: 2})
    .withMessage("SubCategory name minimum length 2 characters")
    .isLength({max: 30})
    .withMessage("SubCategory name maximum length 30 characters")
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must belong to category")
    .isMongoId()
    .withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  check("category").isMongoId().withMessage("Invalid Id format"),
  check("name")
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
