import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {applyCoupon} from "../../RTK/slices/cartSlice";
import Notify from "../useNotification";

const ApplyCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponName, setCouponName] = useState("");
  const onChangeCoupon = (val) => {
    setCouponName(val);
  };
  const handleSubmitCoupon = () => {
    if (couponName === "") {
      Notify("Please enter a coupon name", "error");
      return;
    }
    dispatch(applyCoupon({coupon: couponName}));
  };

  const {appliedCoupon, loading, error} = useSelector(
    (state) => state.cart.applyCoupon
  );

  useEffect(() => {
    if (loading === false) {
      console.log(appliedCoupon);
      if (appliedCoupon !== [] && appliedCoupon.status === 200) {
        Notify("Coupon Applied Successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
      if (error) {
        console.log(error);
        Notify("Expired Or Invalid Coupon", "error");
      }
    }
  }, [loading]);

  const handelCheckout = () => {
    if (cartItems.length >= 1) {
      navigate("/order/paymentMethod");
    } else {
      Notify("Please add products to your cart", "warn");
    }
  };
  return [couponName, onChangeCoupon, handleSubmitCoupon, handelCheckout];
};

export default ApplyCouponHook;
