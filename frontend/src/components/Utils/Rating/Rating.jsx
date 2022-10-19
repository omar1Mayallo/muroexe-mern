import React from "react";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarHalf, MdStarBorder} from "react-icons/md";
const Rating = ({ratingAvr, size, numReviews}) => {
  const reviewSetting = {
    size,
    value: ratingAvr,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
    edit: false,
  };
  return (
    <>
      <div className="d-flex align-items-center">
        <ReactStars {...reviewSetting} />
        {numReviews && (
          <span className="ms-1" style={{color: "gray", fontSize: "13px"}}>
            ({numReviews} reviews)
          </span>
        )}
      </div>
    </>
  );
};

export default Rating;
