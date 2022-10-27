import React, {useEffect} from "react";
import {Button, Form, InputGroup, ListGroup, Spinner} from "react-bootstrap";
import ApplyCouponHook from "../../../hooks/Cart/applyCouponHook";
import EditCartItemHook from "../../../hooks/Cart/editCartItemHook";

const CartCheckout = ({
  cartItems,
  numOfItems,
  totalCartPrice,
  totalCartPriceAfterCouponDiscount,
  couponNameTxt,
}) => {
  const [handleClearCart, , , loading] = EditCartItemHook();
  const [couponName, onChangeCoupon, handleSubmitCoupon, handelCheckout] =
    ApplyCouponHook(cartItems);
  useEffect(() => {
    if (couponNameTxt) {
      onChangeCoupon(couponNameTxt);
    }
  }, [couponNameTxt]);
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <InputGroup>
          <Form.Control
            placeholder="Enter A Coupon"
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            aria-label="coupon"
            size="sm"
          />
          <Button variant="primary" size="sm" onClick={handleSubmitCoupon}>
            Submit
          </Button>
        </InputGroup>
      </ListGroup.Item>

      <ListGroup.Item>
        {totalCartPriceAfterCouponDiscount >= 1
          ? `Total Price : ${totalCartPrice}$ and after discount is ${totalCartPriceAfterCouponDiscount}$`
          : `Total Price : ${totalCartPrice}$`}
      </ListGroup.Item>
      <ListGroup.Item>
        <Button
          variant="dark"
          size="sm"
          className="w-100"
          onClick={handelCheckout}
        >
          checkout
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        {loading ? (
          <Button variant="danger" className="w-100" size="sm" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Clearing...
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            className="w-100"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CartCheckout;
