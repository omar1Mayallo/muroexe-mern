import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllReviewsForSpecificProduct} from "../../RTK/slices/reviewsSlice";

const ViewReviewsProductHook = (id) => {
  const limit = 2;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviewsForSpecificProduct({productId: id, page: 1, limit}));
  }, [id, dispatch]);

  const {loading, allReviewsProduct, error} = useSelector(
    (state) => state.reviews.allReviewForAProduct
  );

  let reviewItems;
  if (loading === false) {
    if (allReviewsProduct !== []) {
      if (allReviewsProduct.data) {
        reviewItems = allReviewsProduct.data.docs;
      }
    }
    if (error) {
      console.log(error);
    }
  }

  const onPress = (page) => {
    dispatch(getAllReviewsForSpecificProduct({productId: id, page, limit}));
  };

  // console.log(reviewItems);

  return [reviewItems, loading, error, onPress, limit];
};

export default ViewReviewsProductHook;
