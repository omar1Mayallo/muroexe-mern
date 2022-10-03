import Product from "../Models/productModel.js";
import {
  createOne,
  deleteOne,
  updateOne,
  getOne,
  getAll,
} from "./handlerFactory/handlerFactory.js";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import {uploadMixOfImages} from "../Middlewares/ImgUploadMiddleware.js";

export const uploadProductImages = uploadMixOfImages([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "sliderImages",
    maxCount: 3,
  },
]);

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();
  //1- Image processing for MAINimage
  if (req.files.image) {
    const imageFileName = `product-${req.user._id}-${Date.now()}-MAIN.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({quality: 90})
      .toFile(`backend/uploads/products/${imageFileName}`);

    // Save image into our db
    req.body.image = imageFileName;
  }
  //2- Image processing for images
  if (req.files.sliderImages) {
    req.body.sliderImages = [];
    await Promise.all(
      req.files.sliderImages.map(async (img, idx) => {
        const imageName = `product-${req.user._id}-${Date.now()}-${
          idx + 1
        }.jpeg`;

        await sharp(img.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({quality: 90})
          .toFile(`backend/uploads/products/${imageName}`);

        // Save image into our db
        req.body.sliderImages.push(imageName);
      })
    );

    next();
  }
});

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = createOne(Product);
// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private
export const updateProduct = updateOne(Product);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = deleteOne(Product);

// @desc    Get All products
// @route   GET /api/products
// @access  Public
export const getAllProducts = getAll(Product);

// @desc    Get a product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = getOne(Product, "reviews");

// @desc    Get Top 7 Sales
// @route   GET /api/products/top-7-sales
// @access  Public
export const topSevenSales = (req, res, next) => {
  req.query.limit = "7";
  req.query.sort = "-priceAfterDiscount,-ratingAvr";
  req.query.fields =
    "name,slug,price,priceAfterDiscount,ratingAvr,image,numReviews";
  next();
};
// @desc    Get Top 7 Latest Products
// @route   GET /api/products/top-7-latest-products
// @access  Public
export const topSevenLatest = (req, res, next) => {
  req.query.limit = "7";
  req.query.fields =
    "name,slug,price,priceAfterDiscount,ratingAvr,image,numReviews";
  next();
};
