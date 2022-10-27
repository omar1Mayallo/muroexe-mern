import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import SecContainer from "../../layout/SecContainer/SecContainer";
import CartBlock from "../../components/Cart/CartBlock/CartBlock";
import {ToastContainer} from "react-toastify";
import CartCheckout from "../../components/Cart/CartCheckout/CartCheckout";
import {useNavigate} from "react-router-dom";
import GetUserCartHook from "../../hooks/Cart/getUserCartHook";

const Cart = () => {
  const navigate = useNavigate();

  const [
    numOfItems,
    cartItems,
    loading,
    totalCartPrice,
    couponNameTxt,
    totalCartPriceAfterCouponDiscount,
    cartID,
  ] = GetUserCartHook();
  return (
    <SecContainer secName="cart-Sec" withMargin>
      <Container>
        <div className="my-4">
          <Button variant="dark" onClick={() => navigate("/shop")}>
            Continuo Shopping
          </Button>
        </div>
        <Row>
          <Col md={8}>
            <div className="bg-light p-2 my-2">
              <CartBlock cartItems={cartItems} loading={loading} />
            </div>
          </Col>
          <Col md={4}>
            <div className="bg-light p-2 my-2">
              <CartCheckout
                cartItems={cartItems}
                numOfItems={numOfItems}
                totalCartPrice={totalCartPrice}
                totalCartPriceAfterCouponDiscount={
                  totalCartPriceAfterCouponDiscount
                }
                couponNameTxt={couponNameTxt}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </SecContainer>
  );
};

export default Cart;
