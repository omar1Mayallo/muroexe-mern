import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeFromWishlist} from "../../RTK/slices/wishlistSlice";
import Notify from "../useNotification";

const RemoveFromWishlistHook = (id) => {
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(id));
  };

  const {loading, wishlist, error} = useSelector(
    (state) => state.wishlist.removeFromWishlist
  );
  useEffect(() => {
    if (loading === false) {
      if (wishlist !== []) {
        if (wishlist && wishlist.status === "success") {
          setTimeout(() => {
            window.location.reload(false);
          }, 100);
        }
      }
      if (error) {
        if (error.message === "Invalid token, please login again")
          Notify("Please login To Get access", "error");
      }
    }
  }, [loading]);

  return [handleRemoveFromWishlist, loading];
};

export default RemoveFromWishlistHook;
