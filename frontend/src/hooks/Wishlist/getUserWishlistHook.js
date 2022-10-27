import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUserWishList} from "../../RTK/slices/wishlistSlice";

const GetUserWishlistHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishList());
  }, [dispatch]);

  const {loading, userWishlist, error} = useSelector(
    (state) => state.wishlist.getUserWishList
  );

  let productItems, results;
  if (loading === false) {
    if (userWishlist !== []) {
      if (userWishlist.data) {
        productItems = userWishlist.data;
      }
      if (userWishlist.results) {
        results = userWishlist.results;
      }
    }
    if (error) {
      console.log(error);
    }
  }

  return [productItems, loading, error, results];
};

export default GetUserWishlistHook;
