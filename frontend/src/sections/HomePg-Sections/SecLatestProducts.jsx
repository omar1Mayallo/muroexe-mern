import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Slider from "react-slick";
import {Container, Alert} from "react-bootstrap";
import SectionHead from "../../components/SectionHead/SectionHead";
import SecContainer from "../../layout/SecContainer/SecContainer";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";

//Requests
import {getLatestProducts} from "../../RTK/slices/productsSlice";

const SecLatestProducts = () => {
  const dispatch = useDispatch();
  const {loading, latestProducts, error} = useSelector(
    (state) => state.products
  );
  const {data} = latestProducts;

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  const LatestProducts =
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
    <SecContainer secName="latestProducts-Sec" withMargin>
      <Container>
        <SectionHead head="Latest Products" />
        <div className="my-3">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : loading ? (
            <Spinner />
          ) : (
            <Slider {...settings}>{LatestProducts}</Slider>
          )}
        </div>
      </Container>
    </SecContainer>
  );
};

export default SecLatestProducts;
