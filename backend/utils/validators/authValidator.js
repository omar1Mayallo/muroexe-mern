import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import User from "../../Models/userModel.js";

export const registerValidator = [
  //Name
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .isLength({min: 3})
    .withMessage("User name minimum length 3 characters")
    .isLength({max: 30})
    .withMessage("User name maximum length 30 characters"),

  //Email
  check("email")
    .notEmpty()
    .withMessage("User Email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (val) => {
      const emailExist = await User.findOne({email: val});
      if (emailExist) {
        throw new Error("Email is already exist");
      }
      return true;
    }),

  //Password
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min: 6})
    .withMessage("Too Short Password"),

  //PasswordConfirmation
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((val, {req}) => {
      if (val !== req.body.password) {
        throw new Error("Password confirm Not matching password");
      }
      return true;
    }),

  validatorMiddleware,
];

export const loginValidator = [
  //Email
  check("email")
    .notEmpty()
    .withMessage("User Email is required")
    .isEmail()
    .withMessage("Invalid Email Format"),

  //Password
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min: 6})
    .withMessage("Too Short Password"),

  validatorMiddleware,
];
