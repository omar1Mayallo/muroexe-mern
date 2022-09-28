import mongoose from "mongoose";
import dotenv from "dotenv";
import _ from "colors";
import connectDB from "../Config/DB.js";
import {categories, products, subcategories, brands, users} from "./devData.js";
import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";
import Category from "../Models/categoryModel.js";
import Brand from "../Models/brandModel.js";
import SubCategory from "../Models/subCategoryModel.js";

dotenv.config();
connectDB();

const insertData = async () => {
  try {
    // 1) Delete all data before insert it to database
    await Product.deleteMany();
    await User.deleteMany();

    // 🟥NOTE🟥 I added this one time to handle Product controller and no need to delete it more
    // await Category.deleteMany();
    // await SubCategory.deleteMany();
    // await Brand.deleteMany();

    // 2) Insert DEV-Data
    await Product.insertMany(products);
    // await User.insertMany(users);

    // await Category.insertMany(categories);
    // await SubCategory.insertMany(subcategories);
    // await Brand.insertMany(brands);

    console.log("Data Imported 🟢".green.bold);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // 1) Delete all resources from Database
    await Product.deleteMany();
    // await User.deleteMany();

    // 🟥NOTE🟥 I added this one time to handle Product controller and no need to delete it more
    // await Category.deleteMany();
    // await SubCategory.deleteMany();
    // await Brand.deleteMany();

    console.log("Data Deleted 🔴".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  insertData();
}
