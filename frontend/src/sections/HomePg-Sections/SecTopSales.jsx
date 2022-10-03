import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Slider from "react-slick";
import {Container, Alert} from "react-bootstrap";
import SectionHead from "../../components/SectionHead/SectionHead";
import SecContainer from "../../layout/SecContainer/SecContainer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";

//Requests
import {getTopSalesProducts} from "../../RTK/slices/productsSlice";

const SecTopSales = () => {
  const dispatch = useDispatch();
  const {loading, topSalesProducts, error} = useSelector(
    (state) => state.products
  );
  const {data} = topSalesProducts;

  useEffect(() => {
    dispatch(getTopSalesProducts());
  }, [dispatch]);
  const TopSalesProducts =
    data &&
    data.docs.map((product) => (
      <div key={product._id}>
        <ProductCard product={product} />
      </div>
    ));

  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
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
  return (
    <SecContainer secName="topSales-Sec" withMargin>
      <Container>
        <SectionHead head="Top Sales" />
        <div className="my-3">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : loading ? (
            <Spinner />
          ) : (
            <Slider {...settings}>{TopSalesProducts}</Slider>
          )}
        </div>
      </Container>
    </SecContainer>
  );
};

export default SecTopSales;
