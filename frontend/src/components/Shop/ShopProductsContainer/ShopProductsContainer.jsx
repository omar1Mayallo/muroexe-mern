import React from "react";
import {Row, Col} from "react-bootstrap";
import ProductCard from "../../Product/ProductCard/ProductCard";

const ShopProductsContainer = ({products}) => {
  const productItems =
    products &&
    products.map((item) => (
      <Col lg={4} key={item._id}>
        <ProductCard product={item} />
      </Col>
    ));
  return (
    <div>
      <Row className="products-container bg-light p-2">{productItems}</Row>
    </div>
  );
};

export default ShopProductsContainer;
