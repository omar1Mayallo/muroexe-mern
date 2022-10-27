import express from "express";
import {allowedTo, protect} from "../Controllers/authController.js";
import {
  createAddress,
  removeAddress,
  getUserAddresses,
} from "../Controllers/addressController.js";

const router = express.Router();

router.use(protect, allowedTo("admin", "user"));

router.route("/").post(createAddress).get(getUserAddresses);

router.delete("/:addressId", removeAddress);

export default router;
