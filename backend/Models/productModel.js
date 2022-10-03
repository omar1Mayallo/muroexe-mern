import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
      minlength: [3, "Product name minimum length 3 characters"],
      maxlength: [30, "Product name maximum length 30 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Product must have main image"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [25, "Too short product description"],
      maxlength: [1500, "Too long product description"],
    },
    sliderImages: [String],
    colors: [String],
    size: [String],
    price: {
      type: Number,
      required: [true, "Product must have a price"],
      max: [1000000, "Massive product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    qtyInStock: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a Category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingAvr: {
      type: Number,
      default: 4,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
      //2.667 ==> 26,67 ==> 27 ==> 2.7
      set: (val) => Math.round(val * 10) / 10,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    //To Virtuals Properties
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre(/^find/, function (next) {
  this.populate({path: "category subcategories", select: "name -_id"});
  next();
});

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
    doc.image = imageUrl;
  }
  if (doc.sliderImages) {
    const imagesList = [];
    doc.sliderImages.forEach((img) => {
      const imageUrl = `${process.env.BASE_URL}/products/${img}`;
      imagesList.push(imageUrl);
    });
    doc.sliderImages = imagesList;
  }
};

productSchema.post("init", (doc) => {
  setImageURL(doc);
});

productSchema.post("save", (doc) => {
  setImageURL(doc);
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
