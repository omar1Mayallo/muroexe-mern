import React, {useEffect} from "react";
import SecContainer from "../../layout/SecContainer/SecContainer";
import {
  Col,
  Container,
  Row,
  Alert,
  Badge,
  Button,
  Image,
  ListGroup,
  Form,
  Accordion,
} from "react-bootstrap";
import Slider from "react-slick";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "../../components/Utils/Spinner/Spinner";
import {ToastContainer} from "react-toastify";
import SecReviews from "../../sections/ProductPg-Sections/SecReviews";
import ProductDetailsHook from "../../hooks/Product/productDetailsHook";
import {BsHeart} from "react-icons/bs";
import Rating from "../../components/Utils/Rating/Rating";
import AddReview from "../../components/Review/AddReview/AddReview";
import "./productDetails.css";
import AddToCartHook from "../../hooks/Cart/addToCartHook";
import AddToWishlistHook from "../../hooks/Wishlist/addToWishlistHook";

const ProductDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [productItem, loading, error] = ProductDetailsHook(id);
  const [
    colorIdx,
    sizeIdx,
    handleColorClick,
    handleSizeClick,
    handleAddToCart,
    handleQtyClick,
  ] = AddToCartHook(id, productItem);
  const [handleAddToWishlist] = AddToWishlistHook(id);

  // console.log(productItem);
  ////////////////////////////////////////////
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
            <Button variant="dark" onClick={() => navigate("/shop")}>
              Continuo shopping
            </Button>
          </div>
          <div className="my-3">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : loading ? (
              <Spinner />
            ) : (
              productItem && (
                <>
                  <Row>
                    {/* SliderImages */}
                    <Col lg={5} md={6} sm={12} className="mb-5">
                      {productItem.sliderImages.length ? (
                        <Slider {...settings}>
                          {productItem.sliderImages.map((img, idx) => (
                            <Image
                              key={idx}
                              src={img}
                              alt="product-slider-image"
                              fluid
                            />
                          ))}
                        </Slider>
                      ) : (
                        <>
                          <Image
                            src={productItem.image}
                            alt="product-image"
                            fluid
                          />
                        </>
                      )}
                    </Col>
                    <Col lg={7} md={6} sm={12}>
                      <Row>
                        <ListGroup variant="flush">
                          {/* Name&Wish */}
                          <ListGroup.Item>
                            <Row>
                              <Col xs={10}>
                                <h3>{productItem.name}</h3>
                              </Col>
                              <Col xs={2} className="text-center">
                                <BsHeart
                                  onClick={handleAddToWishlist}
                                  size="25px"
                                  style={{cursor: "pointer"}}
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          {/* Rating&Reviews */}
                          <ListGroup.Item>
                            <Rating
                              size={25}
                              ratingAvr={productItem.ratingAvr}
                              numReviews={productItem.numReviews}
                            />
                          </ListGroup.Item>
                          {/* Price&Discount */}
                          <ListGroup.Item>
                            <div className="price-Comp">
                              {productItem.priceAfterDiscount ? (
                                <>
                                  <div className="d-flex align-items-center">
                                    <span style={{fontSize: "23px"}}>
                                      ${productItem.priceAfterDiscount}
                                    </span>
                                    <span
                                      className="ms-2"
                                      style={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                      }}
                                    >
                                      ${productItem.price}
                                    </span>
                                    <Badge bg="danger" className="ms-2">
                                      -
                                      {Math.ceil(
                                        ((productItem.price -
                                          productItem.priceAfterDiscount) /
                                          productItem.price) *
                                          100
                                      )}
                                      %
                                    </Badge>
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <span style={{fontSize: "23px"}}>
                                    ${productItem.price}
                                  </span>
                                </div>
                              )}
                            </div>
                          </ListGroup.Item>
                          {/* Category&Subcategories */}
                          <ListGroup.Item>
                            <div className="category-subs-Comp">
                              <h4>
                                <Badge bg="info">
                                  {productItem.category.name}
                                </Badge>
                              </h4>
                              {productItem.subcategories.length !== 0 &&
                                productItem.subcategories.map((subCat, idx) => (
                                  <span key={idx} className="me-2">
                                    <Badge bg="primary">{subCat.name}</Badge>
                                  </span>
                                ))}
                            </div>
                          </ListGroup.Item>
                          {/* Size */}
                          {productItem.size.length !== 0 && (
                            <ListGroup.Item>
                              <div className="size-Comp">
                                <h5>Size</h5>
                                <div className="size-list-block">
                                  {productItem.size.map((el, idx) => (
                                    <div
                                      key={idx}
                                      onClick={() => handleSizeClick(idx, el)}
                                      className="size-item me-2"
                                      style={{
                                        cursor: "pointer",
                                        padding: "10px",

                                        border: "1px solid black",
                                        // backgroundColor: "white",
                                        // border: "3px solid black",
                                        backgroundColor:
                                          sizeIdx === idx ? "black" : "white",
                                        color:
                                          sizeIdx === idx ? "white" : "black",
                                      }}
                                    >
                                      {el}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </ListGroup.Item>
                          )}
                          {/* Color */}
                          {productItem.colors.length !== 0 && (
                            <ListGroup.Item>
                              <div className="color-Comp">
                                <h5>Color</h5>
                                <div className="color-list-block">
                                  {productItem.colors.map((color, index) => {
                                    return (
                                      <div
                                        key={index}
                                        onClick={() =>
                                          handleColorClick(index, color)
                                        }
                                        className="color me-2"
                                        style={{
                                          cursor: "pointer",
                                          height: "40px",
                                          width: "40px",
                                          borderRadius: "50%",
                                          backgroundColor: color,
                                          // border: "3px solid black",
                                          border:
                                            colorIdx === index
                                              ? "4px solid black"
                                              : "none",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </ListGroup.Item>
                          )}
                          {/* Quantity */}
                          {productItem.qtyInStock > 0 ? (
                            <ListGroup.Item>
                              <div>
                                <h5>Quantity</h5>
                                <Row>
                                  <Col xs={3}>
                                    <Form.Control
                                      as="select"
                                      onChange={(e) =>
                                        handleQtyClick(e.target.value)
                                      }
                                    >
                                      {[
                                        ...Array(productItem.qtyInStock).keys(),
                                      ].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Col>
                                  <Col xs={9}>
                                    <Button
                                      variant="primary"
                                      className="w-100"
                                      onClick={handleAddToCart}
                                    >
                                      Add To Cart
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </ListGroup.Item>
                          ) : (
                            <ListGroup.Item>
                              <Alert variant="danger">
                                Quantity In Stock is 0, Not Available Now!
                              </Alert>
                            </ListGroup.Item>
                          )}
                          {/* Description&Reviews */}
                          <ListGroup.Item>
                            <Accordion alwaysOpen>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>Description</Accordion.Header>
                                <Accordion.Body>
                                  {productItem.description}
                                </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="1">
                                <Accordion.Header>Review</Accordion.Header>
                                <Accordion.Body>
                                  <AddReview id={id} />
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </ListGroup.Item>
                        </ListGroup>
                      </Row>
                    </Col>
                  </Row>

                  {/* REVIEWS SECTION */}

                  <SecContainer withMargin secName="Reviews-Sec">
                    <SecReviews
                      numReviews={productItem.reviews.length}
                      id={id}
                    />
                  </SecContainer>
                </>
              )
            )}
          </div>
        </Container>
        <ToastContainer />
      </SecContainer>
    </>
  );
};

export default ProductDetails;
