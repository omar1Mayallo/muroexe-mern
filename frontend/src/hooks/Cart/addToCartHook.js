import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addToCart} from "../../RTK/slices/cartSlice";
import Notify from "../useNotification";

const AddToCartHook = (id, product) => {
  const dispatch = useDispatch();

  const [colorText, setColorText] = useState("");
  const [colorIdx, setColorIdx] = useState("");
  const [sizeText, setSizeText] = useState("");
  const [sizeIdx, setSizeIdx] = useState("");
  const [qty, setQty] = useState(1);

  const handleColorClick = (idx, colorSel) => {
    setColorText(colorSel);
    setColorIdx(idx);
  };
  const handleSizeClick = (idx, sizeSel) => {
    setSizeText(sizeSel);
    setSizeIdx(idx);
  };
  const handleQtyClick = (idx) => {
    setQty(idx);
  };

  const handleAddToCart = () => {
    if (product.colors.length !== 0) {
      if (colorText === "") {
        Notify("Please select a color", "warn");
        return;
      }
    } else {
      setColorText("");
    }
    if (product.size.length !== 0) {
      if (sizeText === "") {
        Notify("Please select a size", "warn");
        return;
      }
    } else {
      setSizeText("");
    }

    dispatch(
      addToCart({
        productId: id,
        size: sizeText,
        quantity: qty,
        color: colorText,
      })
    );
  };
  const {loading, addCart, error} = useSelector(
    (state) => state.cart.addToCart
  );

  useEffect(() => {
    if (loading === false) {
      if (addCart !== []) {
        if (addCart && addCart.status === 200) {
          Notify("Product added successfully to cart", "success");
          setTimeout(() => {
            window.location.href = "/cart";
          }, 500);
        }
      }
      if (error) {
        if (error.message === "Invalid token, please login again")
          Notify("Please login To Get access", "error");
      }
    }
  }, [loading]);

  return [
    colorIdx,
    sizeIdx,
    handleColorClick,
    handleSizeClick,
    handleAddToCart,
    handleQtyClick,
  ];
};

export default AddToCartHook;
