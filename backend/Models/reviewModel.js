import mongoose from "mongoose";
import Product from "./productModel.js";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, "Review is Required"],
      maxlength: [50, "Maximum length is 50 characters"],
      minlength: [4, "Minimum length is 4 characters"],
    },
    rating: {
      type: Number,
      min: [1, "minimum rating is 1"],
      max: [5, "maximum rating is 5"],
      required: [true, "Rating value is Required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
  },
  {timestamps: true}
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({path: "user", select: "name image"});
  // this.populate({path: "product", select: "name"});
  next();
});

//LOGIC of Calc RatingAvr, numOfReviews for Product
//Q: Why use statics not instance method?
//Sol: statics methods define on the model, instance methods define on specific document of the model
reviewSchema.statics.calcAvrRatings = async function (productId) {
  const results = await this.aggregate([
    {
      $match: {product: productId},
    },
    {
      $group: {
        _id: "$product",
        numOfRatings: {$sum: 1},
        avrRating: {$avg: "$rating"},
      },
    },
  ]);

  // console.log(results);

  if (results.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      numReviews: results[0].numOfRatings,
      ratingAvr: results[0].avrRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      numReviews: 0,
      ratingAvr: 0,
    });
  }
};
// 1) For Create A new Review or update it
reviewSchema.post("save", function () {
  this.constructor.calcAvrRatings(this.product);
});
// 2) For Delete A Review
reviewSchema.post("remove", async function () {
  await this.constructor.calcAvrRatings(this.product);
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
