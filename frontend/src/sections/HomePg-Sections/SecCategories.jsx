import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import SecContainer from "../../layout/SecContainer/SecContainer";
import {LinkContainer} from "react-router-bootstrap";
import Slider from "react-slick";

import shoesImg from "../../images/Categories/c-Shoes.jpg";
import sneakersImg from "../../images/Categories/c-Sneakers.jpg";
import slippersImg from "../../images/Categories/c-Slippers.jpg";
import accessoriesImg from "../../images/Categories/c-Accessories.jpg";
const SecCategories = () => {
  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    draggable: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const categoriesImages = [sneakersImg, shoesImg, slippersImg, accessoriesImg];
  const categoriesList = categoriesImages.map((c) => (
    <LinkContainer
      key={c}
      className="p-2"
      to="/shop"
      style={{cursor: "pointer"}}
    >
      <Image src={c} alt="category-img" fluid />
    </LinkContainer>
  ));
  return (
    <SecContainer secName="categories-Sec" withMargin>
      <Container>
        <Slider {...settings}>{categoriesList}</Slider>
      </Container>
    </SecContainer>
  );
};

export default SecCategories;
