import User from "../Models/userModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";

// @desc    Create a new User
// @route   POST /api/users
// @access  Private/admin
export const createUser = createOne(User);

// @desc    Update a User
// @route   PATCH /api/users/:id
// @access  Private/admin
export const updateUser = updateOne(User);

// @desc    Delete a User
// @route   DELETE /api/users/:id
// @access  Private/admin
export const deleteUser = deleteOne(User);

// // @desc    Get All Users
// // @route   GET /api/users
// // @access  Private/admin
export const getAllUsers = getAll(User);

// @desc    Get a User
// @route   GET /api/users/:id
// @access  Private/admin,user
export const getUser = getOne(User);
