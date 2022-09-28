import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "SubCategory name is required"],
      unique: [true, "SubCategory name must be unique"],
      minlength: [2, "SubCategory name minimum length 2 characters"],
      maxlength: [30, "SubCategory name maximum length 30 characters"],
    },
    slug: {type: String, lowercase: true},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to a Category"],
    },
  },
  {timestamps: true}
);

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategoryModel;
