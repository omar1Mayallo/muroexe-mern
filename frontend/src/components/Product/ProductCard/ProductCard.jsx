import React from "react";
import {Image} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarHalf, MdStarBorder} from "react-icons/md";
import {
  CardTitle,
  ProductItem,
  SalePrice,
  Price,
  NumOfRev,
} from "./ProductCardStyles";
import {Link} from "react-router-dom";

// name,slug,price,priceAfterDiscount,ratingAvr,image,numReviews
const ProductCard = ({
  product: {_id, name, price, priceAfterDiscount, ratingAvr, image, numReviews},
}) => {
  const setting = {
    size: 25,
    value: ratingAvr,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
    edit: false,
  };
  return (
    <ProductItem className="p-3 m-2">
      <Link to={`/shop/product/${_id}`}>
        <Image
          src={image}
          alt="product-image"
          className="w-100"
          // style={{height: "225px"}}
        />
      </Link>
      <hr />

      <CardTitle style={{fontSize: "calc(0.75em + 1vmin)"}}>{name}</CardTitle>

      <div className="product-body">
        <div className="my-2">
          <div className="d-flex align-items-center flex-wrap">
            <ReactStars {...setting} />
            <NumOfRev> ({numReviews})</NumOfRev>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Price>{price} $</Price>
          {priceAfterDiscount && (
            <SalePrice className="ms-4">{priceAfterDiscount} $</SalePrice>
          )}
        </div>
      </div>
    </ProductItem>
  );
};

export default ProductCard;
