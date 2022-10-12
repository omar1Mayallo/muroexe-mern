import React, {useState, useEffect} from "react";
import {Accordion, Button, Form} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import SideFilterHook from "../../../hooks/Shop/sideFilterHook";

const SideFilter = () => {
  const [priceTo, categories, onClickCategory, getProducts] = SideFilterHook();
  let priceToStorage = localStorage.getItem("priceTo");
  const [value, setValue] = useState(priceToStorage);

  //Search
  const [searchWord, setSearchWord] = useState("");
  const handleSearch = (e) => {
    setSearchWord(e.target.value);
  };
  const clickSearch = () => {
    localStorage.setItem("searchWord", searchWord);
    getProducts();
  };

  return (
    <div className="side-filter p-2 bg-light">
      <div className="category-filter my-2">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body>
              <RangeSlider
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onAfterChange={(e) => priceTo(e)}
                min={0}
                max={10000}
                tooltip="on"
                tooltipLabel={(currentValue) => `${currentValue} $`}
                tooltipPlacement="top"
                step={200}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex mb-2">
                <input onChange={onClickCategory} type="checkbox" value="0" />
                <div className="filter-cat ms-2">All</div>
              </div>
              {categories ? (
                categories.map((item) => (
                  <div className="d-flex mb-2" key={item._id}>
                    <input
                      onChange={onClickCategory}
                      type="checkbox"
                      value={item._id}
                    />
                    <div className="filter-cat ms-2">{item.name}</div>
                  </div>
                ))
              ) : (
                <h6>No Categories Yet</h6>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex mb-2">
                <input type="checkbox" />
                <div className="filter-sub ms-2">Adidas</div>
              </div>
              <div className="d-flex mb-2">
                <input type="checkbox" />
                <div className="filter-sub ms-2">Nike</div>
              </div>
              <div className="d-flex mb-2">
                <input type="checkbox" />
                <div className="filter-sub ms-2">Converse</div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              <h6>5 Stars</h6>
              <h6>4 Stars</h6>
              <h6>3 Stars</h6>
              <h6>2 Stars</h6>
              <h6>1 Stars</h6>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Search</Accordion.Header>
            <Accordion.Body>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  size="sm"
                  onChange={handleSearch}
                />
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => clickSearch()}
                >
                  search
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default SideFilter;
