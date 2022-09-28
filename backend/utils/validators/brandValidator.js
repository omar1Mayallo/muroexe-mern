import {check} from "express-validator";
import slugify from "slugify";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";

export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({min: 3})
    .withMessage("Brand name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("Brand name maximum length 30 characters")
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  check("name")
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
