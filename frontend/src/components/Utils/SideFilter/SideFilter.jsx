import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import SideFilterHook from "../../../hooks/Shop/sideFilterHook";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarBorder} from "react-icons/md";
const SideFilter = () => {
  const [
    priceTo,
    categories,
    onClickCategory,
    brands,
    onClickBrand,
    onClickRating,
  ] = SideFilterHook();
  let priceToStorage = localStorage.getItem("priceTo");
  const [value, setValue] = useState(priceToStorage);

  let settings = [];
  for (let index = 5; index >= 1; index--) {
    const setting = {
      size: 25,
      value: index,
      isHalf: true,
      emptyIcon: <MdStarBorder />,
      filledIcon: <MdStar />,
      edit: false,
    };
    settings.push(setting);
  }

  const starsItems = settings.map((setting, idx) => (
    <div className="d-flex mb-2" key={idx}>
      <input onChange={onClickRating} type="checkbox" value={setting.value} />
      <div className="ms-2">
        <ReactStars {...setting} />
      </div>
    </div>
  ));

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
                <input onChange={onClickBrand} type="checkbox" value="0" />
                <div className="filter-cat ms-2">All</div>
              </div>
              {brands ? (
                brands.map((item) => (
                  <div className="d-flex mb-2" key={item._id}>
                    <input
                      onChange={onClickBrand}
                      type="checkbox"
                      value={item._id}
                    />
                    <div className="filter-cat ms-2">{item.name}</div>
                  </div>
                ))
              ) : (
                <h6>No Brands Yet</h6>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex mb-2">
                <input onChange={onClickRating} type="checkbox" value="0" />
                <div className="filter-cat ms-2">All</div>
              </div>
              {starsItems}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default SideFilter;
