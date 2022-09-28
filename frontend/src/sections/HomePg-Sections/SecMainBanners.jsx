import React from "react";
import Slider from "react-slick";
import {Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import SecContainer from "../../layout/SecContainer/SecContainer";
import mainBannerOne from "../../images/Banners/main-banner-1.jpg";
import mainBannerTwo from "../../images/Banners/main-banner-2.jpg";

const SecMainBanners = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    draggable: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <SecContainer secName="mainBanner-Sec">
      <Slider {...settings}>
        <LinkContainer to="/shop">
          <Image src={mainBannerOne} alt="main-banner-img" fluid />
        </LinkContainer>
        <LinkContainer to="/shop">
          <Image src={mainBannerTwo} alt="main-banner-img" fluid />
        </LinkContainer>
      </Slider>
    </SecContainer>
  );
};

export default SecMainBanners;
