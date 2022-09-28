import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import slugify from "slugify";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min: 3})
    .withMessage("Category name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Category name maximum length 30 characters")
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  check("name")
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
