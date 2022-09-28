import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import User from "../../Models/userModel.js";

export const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({min: 3})
    .withMessage("Too short User name"),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (val) => {
      const emailExist = await User.findOne({email: val});
      if (emailExist) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters"),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Password confirmation required")
    .custom((val, {req}) => {
      if (val !== req.body.password) {
        throw new Error("Password confirm Not matching password");
      }
      return true;
    }),
  check("image").optional(),
  check("role").optional(),

  validatorMiddleware,
];

export const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("name").optional(),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (val) => {
      const emailExist = await User.findOne({email: val});
      if (emailExist) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  check("profileImg").optional(),
  check("role").optional(),

  validatorMiddleware,
];

export const getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

export const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
