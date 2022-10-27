import User from "../Models/userModel.js";
import {promisify} from "util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import APIError from "../utils/apiError.js";
import createToken from "../utils/createToken.js";
import sharp from "sharp";
import {uploadSingleImg} from "../Middlewares/ImgUploadMiddleware.js";

// Upload single image
export const uploadUserImage = uploadSingleImg("image");

// Resize image
export const resizeUserImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `user-${
    req.user ? req.user._id : Math.random().toString().split(".")[1]
  }-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`backend/uploads/users/${filename}`);
  // Save image into our db
  req.body.image = filename;
  next();
});

//Filtered Object of body for updateMyProfile
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//Refactor A Send Token Response that used in register, login
//NOTE: Best place to reserve the token in browser cookies
const createSendToken = (user, status, res) => {
  const token = createToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    //Only send in HTTPS requests
    // secure: true,
    //Cookie not accessed in any way by the browser , just save it and send it back for every request
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  //Remove The Password from output results when i create(register) a new user
  user.password = undefined;

  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// @desc    Register
// @route   POST /api/v1/users/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const {name, email, password, passwordConfirmation, image} = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirmation,
    image,
  });

  createSendToken(newUser, 201, res);
  // const token = createToken(newUser._id);

  // res.status(201).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
});

// @desc    Login
// @route   POST /api/v1/users/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  // 1) If There is Email and Password
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new APIError("Please enter Your Email and Password", 400));
  }
  // 2) If there is user match and password is correct
  const user = await User.findOne({email}).select("+password");
  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new APIError("Incorrect Email or Password", 401));
  }
  // 3) If above ok , send Token
  createSendToken(user, 200, res);
  // const token = createToken(user._id);

  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
});

// @desc    Protect Routes For Authenticated Users
export const protect = asyncHandler(async (req, res, next) => {
  // 1) If Token exist , Get It, If Not exist, send ERROR
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new APIError("Please login to get access", 401));
  }

  // 2)Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if user exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new APIError("The User that belong to this token didn't exist", 401)
    );
  }

  // 4) Check if the user changed password after token is issued (decoded.iat)
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new APIError("User changed password recently , Please Login again", 401)
    );
  }

  req.user = currentUser;
  next();
});

// @desc    Accessability
export const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError("You don't have permission to perform this action", 403)
      );
    }
    next();
  });

// @desc    Update Logged User Password
// @route   PATCH /api/users/updateMyPassword
// @access  Private/user
export const updateMyPassword = asyncHandler(async (req, res, next) => {
  const {currentPassword, newPassword, newPasswordConfirmation} = req.body;
  // 1) Get the logged user
  const user = await User.findById(req.user._id).select("+password");
  console.log(user);
  // 2) Check if entered currentPassword is correct
  if (!(await user.checkCorrectPassword(currentPassword, user.password))) {
    return next(new APIError("Your current password is incorrect", 401));
  }
  //3) Check if the newPassword === newPasswordConfirmation
  if (newPassword !== newPasswordConfirmation) {
    return next(
      new APIError("New password and new password confirm don't match", 401)
    );
  }

  // 4) Update The user password
  const userUpdated = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(newPassword, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 5) Login user and send JWT
  const token = createToken(userUpdated._id);

  res.status(200).json({
    status: "success",
    token,
    userUpdated,
  });
});

// @desc    Update Logged User Profile(name, email)
// @route   PATCH /api/users/updateMyProfile
// @access  Private/user
export const updateMyProfile = asyncHandler(async (req, res, next) => {
  // 1) Check if the user try to update password
  if (req.body.password || req.body.passwordConfirmation) {
    return next(new APIError("This route not for update password", 400));
  }

  // 2) update profile data (name, email,image)
  const filteredBody = filterObj(req.body, "email", "name");
  if (req.file) filteredBody.image = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

// @desc    Delete(Deactivate) Logged User
// @route   PATCH /api/users/deleteMyProfile
// @access  Private/user
export const deleteMyProfile = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {active: false});
  res.status(204).json({status: "success"});
});
