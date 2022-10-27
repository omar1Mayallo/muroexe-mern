import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateCartItemQty,
} from "../../RTK/slices/cartSlice";
import Notify from "../useNotification";

//Delete, Update, Clear
const EditCartItemHook = (item) => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const {clearedCart, loading, error} = useSelector(
    (state) => state.cart.clearCart
  );
  useEffect(() => {
    if (loading === false) {
      if (clearedCart === "") {
        // Notify("Cart Clear Successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    }
  }, [loading]);

  const handleDeleteCartItem = () => {
    dispatch(removeFromCart(item._id));
    window.location.reload(false);
  };

  const handleUpdateCartItem = (qty) => {
    dispatch(updateCartItemQty({productId: item._id, body: {quantity: qty}}));
    window.location.reload(false);
  };

  return [handleClearCart, handleDeleteCartItem, handleUpdateCartItem, loading];
};

export default EditCartItemHook;
