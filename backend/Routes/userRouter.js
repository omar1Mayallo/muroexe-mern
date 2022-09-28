import express from "express";
import {
  register,
  login,
  protect,
  allowedTo,
  updateMyPassword,
  updateMyProfile,
  deleteMyProfile,
  uploadUserImage,
  resizeUserImage,
} from "../Controllers/authController.js";
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";
import {
  registerValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";
import {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
} from "../utils/validators/userValidator.js";

const router = express.Router();

//Authentication
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.use(protect);
//The Logged User
router.patch("/updateMyPassword", updateMyPassword);
router.patch(
  "/updateMyProfile",
  uploadUserImage,
  resizeUserImage,
  updateMyProfile
);
router.delete("/deleteMyProfile", deleteMyProfile);

router.use(allowedTo("admin"));
//The Admin routes
router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
export default router;
