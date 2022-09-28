import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name minimum length 3 characters"],
      maxlength: [30, "Category name maximum length 30 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Category must have image"],
    },
    description: {
      type: String,
      trim: true,
      minlength: [20, "Category description minimum length 3 characters"],
      maxlength: [200, "Category description maximum length 200 characters"],
    },
  },
  {timestamps: true}
);

//The Image create in DB only as name of image so, to get access the image in frontend we put a serverUrl and the img folderName
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
//init is synchronous ==> don't access for promises or next()
// schema.post('init',...} ==>this fired for findOne, findAll and update
categorySchema.post("init", (doc) => {
  setImageURL(doc);
});

// schema.post('save',...} ==>this fired for CREATE, SAVE
categorySchema.post("save", (doc) => {
  setImageURL(doc);
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
