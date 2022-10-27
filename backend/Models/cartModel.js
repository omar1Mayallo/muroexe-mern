import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.ObjectId, ref: "User"},
    cartItems: [
      {
        product: {type: mongoose.Schema.ObjectId, ref: "Product"},
        quantity: {type: Number, default: 1},
        size: String,
        color: String,
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterCouponDiscount: Number,
  },
  {timestamps: true}
);
// CartSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "cartItems.product",
//     select: "name image qtyInStock -category -subcategories",
//   });
//   next();
// });
const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
