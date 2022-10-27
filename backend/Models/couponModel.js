import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Coupon name is required"],
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire time is required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount value is required"],
      max: [100, "Coupon discount maximum value is 100"],
      min: [0.5, "Coupon discount minimum value is 0.5"],
    },
  },
  {timestamps: true}
);

const CouponModel = mongoose.model("Coupon", CouponSchema);

export default CouponModel;
