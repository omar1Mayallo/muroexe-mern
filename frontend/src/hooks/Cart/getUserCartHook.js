import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUserCart} from "../../RTK/slices/cartSlice";

const GetUserCartHook = () => {
  const dispatch = useDispatch();

  const [numOfItems, setNumOfItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [couponNameTxt, setCouponName] = useState("");
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [
    totalCartPriceAfterCouponDiscount,
    setTotalCartPriceAfterCouponDiscount,
  ] = useState(0);
  const [cartID, setCartID] = useState("0");

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const {loading, userCart, error} = useSelector(
    (state) => state.cart.getUserCart
  );

  useEffect(() => {
    if (loading === false) {
      if (userCart !== []) {
        if (userCart.status === "success") {
          setNumOfItems(userCart.numOfCartItems);
          setCartItems(userCart.data.cartItems);
          setTotalCartPrice(userCart.data.totalPrice);
          setTotalCartPriceAfterCouponDiscount(
            userCart.data.totalPriceAfterCouponDiscount
          );
          setCartID(userCart.data._id);
        } else {
          setCartID("0");
          setCouponName("");
          setTotalCartPriceAfterCouponDiscount(0);
          setNumOfItems(0);
          setCartItems([]);
          setTotalCartPrice(0);
        }
      }
      if (error) {
        console.log(error);
      }
    }
  }, [loading]);

  return [
    numOfItems,
    cartItems,
    loading,
    totalCartPrice,
    couponNameTxt,
    totalCartPriceAfterCouponDiscount,
    cartID,
  ];
};

export default GetUserCartHook;
