import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../RTK/slices/productsSlice";

const ProductDetailsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  const {loading, productInfo, error} = useSelector(
    (state) => state.products.productDetails
  );
  // console.log(error);
  let productItem;
  if (loading === false) {
    if (productInfo !== []) {
      if (productInfo.data) {
        productItem = productInfo.data.doc;
      }
    }
    if (error) {
      console.log(error);
    }
  }

  return [productItem, loading, error];
};

export default ProductDetailsHook;
