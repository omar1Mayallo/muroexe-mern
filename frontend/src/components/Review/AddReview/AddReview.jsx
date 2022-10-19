import React from "react";
import {Button, Image} from "react-bootstrap";
import AddReviewHook from "../../../hooks/Review/addReviewHook";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarHalf, MdStarBorder} from "react-icons/md";
const AddReview = ({id}) => {
  const [
    handleChangeReviewText,
    handleChangeReviewRate,
    reviewText,
    reviewRate,
    user,
    handleSubmit,
  ] = AddReviewHook(id);

  const setting = {
    size: 40,
    count: 5,
    color: "yellow",
    activeColor: "yellow",
    value: reviewRate,
    a11y: true,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
    onChange: (newValue) => {
      handleChangeReviewRate(newValue);
    },
  };

  return (
    <div className="add-review">
      {user ? (
        <>
          <div className="d-flex align-items-center mb-3">
            <Image
              className="rounded-circle"
              src={user.image}
              alt="user-image"
              style={{width: "50px", height: "50px"}}
            />
            <h5 className="ms-1" style={{marginBottom: 0}}>
              {user.name}
            </h5>
          </div>
          <textarea
            className="w-100"
            value={reviewText}
            onChange={handleChangeReviewText}
            cols="30"
            rows="2"
            placeholder="Add Your Review ..."
          ></textarea>
          <ReactStars {...setting} />

          <Button variant="primary" onClick={handleSubmit} className="mx-auto">
            Add Review
          </Button>
        </>
      ) : (
        <div>Login To Add Your Review</div>
      )}
    </div>
  );
};

export default AddReview;
