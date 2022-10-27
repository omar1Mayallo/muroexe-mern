import React from "react";
import {ListGroup, Row, Col, Image, Form, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

import Spinner from "../../Utils/Spinner/Spinner";
import CartItem from "../CartItem/CartItem";
const CartBlock = ({cartItems, loading}) => {
  return (
    <>
      <ListGroup variant="flush">
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {cartItems && cartItems.length ? (
              <>
                <ListGroup.Item className="table-head">
                  <Row>
                    <Col xs={2} className="my-1 text-center">
                      Image
                    </Col>
                    <Col xs={2} className="my-1 text-center">
                      Name
                    </Col>
                    <Col xs={2} className="my-1 text-center">
                      Size
                    </Col>
                    <Col xs={2} className="my-1 text-center">
                      Color
                    </Col>
                    <Col xs={2} className="my-1 text-center">
                      Qty
                    </Col>
                    <Col xs={2} className="my-1 text-center">
                      Price
                    </Col>
                  </Row>
                </ListGroup.Item>
                {cartItems.map((item, idx) => (
                  <CartItem item={item} key={idx} />
                ))}
              </>
            ) : (
              <>
                <Alert variant="info">
                  No Products Added yet ,
                  <Link style={{color: "red"}} to={"/shop"}>
                    Go Shopping
                  </Link>
                </Alert>
              </>
            )}
          </>
        )}
      </ListGroup>
    </>
  );
};

export default CartBlock;
