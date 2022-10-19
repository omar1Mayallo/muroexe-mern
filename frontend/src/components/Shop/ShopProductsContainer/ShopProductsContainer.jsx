import React from "react";
import {Row, Col, Alert} from "react-bootstrap";
import ProductCard from "../../Product/ProductCard/ProductCard";

const ShopProductsContainer = ({products}) => {
  const productItems = products.length ? (
    products.map((item) => (
      <Col lg={4} key={item._id}>
        <ProductCard product={item} />
      </Col>
    ))
  ) : (
    <Alert variant="info">No products matches ...!</Alert>
  );

  return (
    <div>
      <Row className="products-container bg-light p-2">{productItems}</Row>
    </div>
  );
};

export default ShopProductsContainer;
