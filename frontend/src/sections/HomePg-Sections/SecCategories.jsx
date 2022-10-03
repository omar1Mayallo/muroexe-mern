import React, {useEffect} from "react";
import {Container, Image, Alert} from "react-bootstrap";
import SecContainer from "../../layout/SecContainer/SecContainer";
import {LinkContainer} from "react-router-bootstrap";
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../RTK/slices/categoriesSlice";
import Spinner from "../../components/Spinner/Spinner";

const SecCategories = () => {
  const dispatch = useDispatch();
  const {loading, allCategories, error} = useSelector(
    (state) => state.categories
  );
  const {data} = allCategories;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
  const categoriesList =
    data &&
    data.docs.map(({_id, image, slug}) => (
      <LinkContainer
        key={_id}
        className="p-2"
        to={`/categories/${slug}`}
        style={{cursor: "pointer"}}
      >
        <Image src={image} alt="category-img" fluid />
      </LinkContainer>
    ));
  return (
    <SecContainer secName="categories-Sec" withMargin>
      <Container>
        <div className="my-3">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : loading ? (
            <Spinner />
          ) : (
            <Slider {...settings}>{categoriesList}</Slider>
          )}
        </div>
      </Container>
    </SecContainer>
  );
};

export default SecCategories;
