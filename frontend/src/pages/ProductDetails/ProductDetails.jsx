import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import SecContainer from "../../layout/SecContainer/SecContainer";
import {Col, Container, Row, Alert, Badge, Button} from "react-bootstrap";
import Slider from "react-slick";
import {useNavigate, useLocation} from "react-router-dom";
import {getProductDetails} from "../../RTK/slices/productsSlice";
import Spinner from "../../components/Spinner/Spinner";
import Notify from "../../hooks/useNotification";
import {ToastContainer} from "react-toastify";
import SecReviews from "../../sections/ProductPg-Sections/SecReviews";
const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = location.pathname.split("shop/")[1];

  const {loading, productDetails, error} = useSelector(
    (state) => state.products
  );

  const {data} = productDetails;
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [productId, dispatch]);

  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <SecContainer secName="productDetails-Sec" withMargin>
        <Container>
          <div className="my-3">
            {/* <Button variant="dark" onClick={() => navigate("/")}> */}
            <Button variant="dark" onClick={() => Notify("Hello", "warn")}>
              Go Back
            </Button>
          </div>
          <div className="my-3">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : loading ? (
              <Spinner />
            ) : (
              <>
                <Row>
                  <Col lg={5} md={6} sm={12} className="mb-5">
                    <Slider {...settings}>
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                    </Slider>
                  </Col>
                  <Col lg={7} md={6} sm={12}>
                    <Row>
                      <Col xs={10}>Product Name</Col>
                      <Col xs={2}>Wish Icon</Col>
                      <Col xs={12}>Category : Product Name</Col>
                    </Row>

                    <Row>
                      <Col xs={12}>Price or PriceAfterDiscount $</Col>
                      <Col xs={12}>
                        <span style={{textDecoration: "line-through"}}>
                          600$
                        </span>
                        <Badge bg="danger">-80%</Badge>
                      </Col>
                    </Row>

                    <Row>
                      <span>Size</span>
                      <Col xs={12}>Size List</Col>
                    </Row>

                    <Row>
                      <span>Color</span>
                      <Col xs={12}>Color List</Col>
                    </Row>

                    {/*If Category !== "Accessories" */}
                    <Row>
                      <Col>
                        <Button>Size Chart</Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={3}>
                        <div>Select Box of Quantity</div>
                      </Col>
                      <Col xs={3}>
                        <Button>Add To Cart</Button>
                      </Col>
                    </Row>

                    <Row>
                      <div>Accordion</div>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <div>Add Your Review Modal </div>
                </Row>

                <Row>
                  <SecReviews />
                </Row>

                <Row>
                  <div>Slider Of Products in The Same Category</div>
                </Row>
              </>
            )}
          </div>
        </Container>
        <ToastContainer />
      </SecContainer>
    </>
  );
};

export default ProductDetails;
