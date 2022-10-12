import React from "react";
import {Row, Col, Form} from "react-bootstrap";

const FilterBar = ({results, getProducts}) => {
  const sortClicked = (key) => {
    localStorage.setItem("sortType", key);
    getProducts();
  };
  return (
    <Row className="my-3 d-flex align-items-center">
      <Col lg={4}>
        <span>Results: {results} products</span>
      </Col>

      <Col lg={{span: 4, offset: 4}}>
        <Form.Select
          size="sm"
          aria-label="Filtered by select"
          onChange={(e) => sortClicked(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="Price high to low">Price high to low</option>
          <option value="Price low to high">Price low to high</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Rating Low to high">Rating Low to high</option>
          <option value="Rating high to low">Rating high to low</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;
