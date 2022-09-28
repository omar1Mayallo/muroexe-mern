import {check} from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";
import Category from "../../Models/categoryModel.js";
import SubCategory from "../../Models/subCategoryModel.js";
import slugify from "slugify";

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
export const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  check("name")
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
export const createProductValidator = [
  //name
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({min: 3})
    .withMessage("Product name minimum length 3 characters")
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),

  //description
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({max: 1500})
    .withMessage("Product name minimum length 3 characters"),

  //price
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product quantity must be number")
    .isLength({max: 1000000})
    .withMessage("Massive product price"),
  //image
  check("image").notEmpty().withMessage("Product image is required"),

  //qtyInStock
  check("qtyInStock")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),

  //sliderImages
  check("sliderImages")
    .optional()
    .isArray()
    .withMessage("Product images must be array"),

  //colors
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be array"),

  //size
  check("size").optional().isArray().withMessage("Product size must be array"),

  //priceAfterDiscount
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be number")
    //Validate the priceAfterDiscount below price
    .custom((val, {req}) => {
      if (val >= req.body.price) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  //category
  check("category")
    .notEmpty()
    .withMessage("Product must belong to a Category")
    .isMongoId()
    .withMessage("Invalid category Id format")
    //Check if category exists in DB
    .custom(async (categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) {
        return Promise.reject(new Error(`No category with id ${categoryId}`));
      }
    }),

  //subcategories
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory Id format")
    //Check if subCategories exists in DB
    .custom(async (subCategoriesIdsArray) => {
      const listOfSubCategoriesIds = await SubCategory.find({
        _id: {$exists: true, $in: subCategoriesIdsArray},
      });
      if (
        listOfSubCategoriesIds.length < 1 ||
        listOfSubCategoriesIds.length !== subCategoriesIdsArray.length
      ) {
        return Promise.reject(new Error(`Invalid subCategories Ids`));
      }
    })
    //Check if subCategories belong to the category which entered
    .custom(async (subCategoriesIdsArray, {req}) => {
      // 1) Find All SubCategories to The Category that entered to product
      const subCategories = await SubCategory.find({
        category: req.body.category,
      });
      // 2) We need only ids of subcategories so, we push them to  this array
      const subCategoriesIdsInDB = [];
      subCategories.forEach((subCategory) =>
        subCategoriesIdsInDB.push(subCategory._id.toString())
      );
      // 3) Check if every element of subCategoriesIdsArray which iam entered , in subCategoriesIdsInDB
      if (
        !subCategoriesIdsArray.every((val) =>
          subCategoriesIdsInDB.includes(val)
        )
      ) {
        return Promise.reject(
          new Error(
            `SubCategories do not Belong to the category which you entered `
          )
        );
      }
    }),

  //brand
  check("brand").optional().isMongoId().withMessage("Invalid brand Id format"),

  //ratingAvr
  check("ratingAvr")
    .optional()
    .isNumeric()
    .withMessage("Rating must be a number")
    .isLength({min: 1})
    .withMessage("Rating must be above or equal 1.0")
    .isLength({max: 5})
    .withMessage("Rating must be below or equal 5.0"),

  //numReviews
  check("numReviews")
    .optional()
    .isNumeric()
    .withMessage("numReviews must be a number"),

  validatorMiddleware,
];
