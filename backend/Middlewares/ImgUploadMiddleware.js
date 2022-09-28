import multer from "multer";
import APIError from "../utils/apiError.js";

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new APIError("Please Upload Image Only", 400), false);
    }
  };
  const upload = multer({storage: multerStorage, fileFilter: multerFilter});
  return upload;
};

export const uploadSingleImg = (fieldName) => multerOptions().single(fieldName);

export const uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
