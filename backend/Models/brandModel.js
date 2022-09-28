import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Brand name is required"],
      unique: [true, "Brand name must be unique"],
      minlength: [3, "Brand name minimum length 3 characters"],
      maxlength: [30, "Brand name maximum length 30 characters"],
    },
    slug: {type: String, lowercase: true},
    image: {type: String},
  },
  {timestamps: true}
);

//The Image create in DB only as name of image so, to get access the image in frontend we put a serverUrl and the img folderName
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
//init is synchronous ==> don't access for promises or next()
// schema.post('init',...} ==>this fired for findOne, findAll and update
BrandSchema.post("init", (doc) => {
  setImageURL(doc);
});

// schema.post('save',...} ==>this fired for CREATE, SAVE
BrandSchema.post("save", (doc) => {
  setImageURL(doc);
});

const BrandModel = mongoose.model("Brand", BrandSchema);

export default BrandModel;
