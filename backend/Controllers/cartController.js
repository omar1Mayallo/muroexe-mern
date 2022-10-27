import asyncHandler from "express-async-handler";
import APIError from "../utils/apiError.js";
import Cart from "../Models/cartModel.js";
import Coupon from "../Models/couponModel.js";
import Product from "../Models/productModel.js";

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  cart.totalPrice = totalPrice;
  cart.totalPriceAfterCouponDiscount = undefined;

  return totalPrice;
};

// @desc    Add product to cart
// @route   POST /api/carts
// @access  Private/user
export const addToCart = asyncHandler(async (req, res, next) => {
  const {productId, color, size, quantity} = req.body;
  // 1) Select The Product
  const product = await Product.findById(productId);

  // 2) Select The User Cart
  let cart = await Cart.findOne({user: req.user._id});

  // 3) a) If No Cart Exist create a new Cart
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {product: productId, price: product.price, color, size, quantity},
      ],
    });
    console.log(quantity);
  } //  b) If product exist in Cart, update quantity +1
  else {
    // findIndex for product inside cart
    const productIdx = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size
    );
    console.log(productIdx);
    // if productIdx > -1 (product is exist inside cart,, then +1 quantity )
    if (productIdx > -1) {
      const cartItem = cart.cartItems[productIdx];
      cartItem.quantity += 1;

      cart.cartItems[productIdx] = cartItem;
    } // else push product to cartItems array
    else {
      cart.cartItems.push({
        product: productId,
        price: product.price,
        color,
        size,
        quantity,
      });
    }
  }

  //after added calculate the totalPrice or update existed totalPrice
  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added successfully to cart ",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Get user Cart
// @route   GET /api/carts
// @access  Private/user
export const getUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({user: req.user._id}).populate({
    path: "cartItems.product",
    select: "name image qtyInStock -category -subcategories",
  });

  if (!cart) {
    return next(
      new APIError(`There is no cart match this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Remove product from cart
// @route   DELETE /api/carts/:productId
// @access  Private/user
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    {user: req.user._id},
    {
      $pull: {cartItems: {_id: req.params.productId}},
    },
    {new: true}
  );

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    clear user cart
// @route   DELETE /api/carts
// @access  Private/user
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({user: req.user._id});
  res.status(204).send();
});

// @desc    Update cart item quantity
// @route   PATCH /api/carts/:productId
// @access  Private/user
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const {quantity} = req.body;

  const cart = await Cart.findOne({user: req.user._id});
  if (!cart) {
    return next(
      new APIError(`there is no cart match user ${req.user._id}`, 404)
    );
  }

  const productIdx = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.productId
  );
  if (productIdx > -1) {
    const cartItem = cart.cartItems[productIdx];
    cartItem.quantity = quantity;
    cart.cartItems[productIdx] = cartItem;
  } else {
    return next(
      new APIError(`there is no item match this id :${req.params.itemId}`, 404)
    );
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
// @desc    Apply coupon on user cart
// @route   PATCH /api/carts/applyCoupon
// @access  Private/User
export const applyCoupon = asyncHandler(async (req, res, next) => {
  // 1) Get coupon based on coupon name
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: {$gt: Date.now()},
  });
  if (!coupon) {
    return next(new APIError(`This Coupon is invalid or expired`));
  }

  // 2) Get user cart to get total cart price
  const cart = await Cart.findOne({user: req.user._id});

  const totalPrice = cart.totalPrice;

  // 3) Calculate price after coupon discount
  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterCouponDiscount = totalPriceAfterDiscount;
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
