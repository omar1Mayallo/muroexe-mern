import React from "react";

import {Row, Col, Alert} from "react-bootstrap";
import GetUserWishlistHook from "../../../hooks/Wishlist/getUserWishlistHook";
import ProductCard from "../../Product/ProductCard/ProductCard";
import Spinner from "../../Utils/Spinner/Spinner";
const UserWishlistBlock = () => {
  const [productItems, loading, error, results] = GetUserWishlistHook();
  console.log(productItems);
  return (
    <div className="p-3 bg-light">
      <div className="d-flex">
        <h2>User Wishlist</h2>
        {results && <p className="ms-auto">results : {results}</p>}
      </div>

      <Row className="my-2">
        {loading ? (
          <Spinner />
        ) : productItems && productItems.length > 0 ? (
          productItems.map((item, idx) => (
            <Col lg={4} md={6} xs={12} key={idx}>
              <ProductCard product={item} wishList />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No Products in your wishlist</Alert>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UserWishlistBlock;
