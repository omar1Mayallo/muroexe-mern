import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addToWishlist} from "../../RTK/slices/wishlistSlice";
import Notify from "../useNotification";

const AddToWishlistHook = (id) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({productId: id}));
  };

  const {loading, addWishlist, error} = useSelector(
    (state) => state.wishlist.addToWishlist
  );
  useEffect(() => {
    if (loading === false) {
      if (addWishlist !== []) {
        if (addWishlist && addWishlist.status === 200) {
          Notify("Product added successfully to wishlist", "success");
          setTimeout(() => {
            window.location.href = "/user/wishlist";
          }, 500);
        }
      }
      if (error) {
        if (error.message === "Invalid token, please login again")
          Notify("Please login To Get access", "error");
      }
    }
  }, [loading]);

  return [handleAddToWishlist];
};

export default AddToWishlistHook;
