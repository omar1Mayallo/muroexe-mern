import React from "react";
import {Col, ListGroup, Row, Image, Form} from "react-bootstrap";
import {MdOutlineClose} from "react-icons/md";
import EditCartItemHook from "../../../hooks/Cart/editCartItemHook";
const CartItem = ({item}) => {
  const [handleClearCart, handleDeleteCartItem, handleUpdateCartItem] =
    EditCartItemHook(item);

  // console.log(item);
  return (
    <ListGroup.Item style={{position: "relative"}}>
      <div
        onClick={handleDeleteCartItem}
        className="bg-primary"
        style={{position: "absolute", top: "0", left: "0"}}
      >
        <MdOutlineClose size={20} style={{cursor: "pointer", color: "white"}} />
      </div>

      <Row>
        <Col xs={2} className="my-1 text-center">
          <Image src={item.product.image} alt={"item.name"} fluid rounded />
        </Col>
        <Col xs={2} className="my-1 text-center">
          <span>{item.product.name}</span>
        </Col>
        <Col xs={2} className="my-1 text-center">
          <span>{item.size ? item.size : "_"}</span>
        </Col>
        <Col xs={2} className="my-1 text-center">
          {item.color ? (
            <div
              className="mx-auto"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "100%",
                background: `${item.color}`,
              }}
            />
          ) : (
            <span>_</span>
          )}
        </Col>
        <Col xs={2} className="my-1 text-center">
          <Form.Control
            as="select"
            value={item.quantity}
            onChange={(e) => {
              handleUpdateCartItem(e.target.value);
            }}
          >
            {[...Array(item.product.qtyInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col xs={2} className="my-1 text-center">
          <span>{item.price}$</span>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
