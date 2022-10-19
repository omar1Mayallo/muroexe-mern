import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createReview} from "../../RTK/slices/reviewsSlice";
import Notify from "../useNotification";

const AddReviewHook = (id) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [reviewRate, setReviewRate] = useState(0);

  const handleChangeReviewText = (e) => {
    setReviewText(e.target.value);
  };
  const handleChangeReviewRate = (value) => {
    setReviewRate(value);
  };

  let user = "";
  if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const handleSubmit = () => {
    if (reviewText === "") {
      return Notify("Please, Add your review", "error");
    }
    if (reviewRate === 0) {
      return Notify("Please, Rate the product", "error");
    }
    dispatch(
      createReview({
        productId: id,
        body: {review: reviewText, rating: reviewRate},
      })
    );
  };

  const {reviewPosted, loading, error} = useSelector(
    (state) => state.reviews.reviewCreated
  );
  useEffect(() => {
    if (loading === false) {
      //Review Success Created
      if (reviewPosted !== []) {
        if (reviewPosted.status && reviewPosted.status === 201) {
          Notify("Successfully Added", "success");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
      //Review handle errors
      if (error) {
        if (error.data.errors) {
          error.data.errors.forEach((err) => {
            if (err.msg === "You already have a review for this product") {
              Notify("You already have a review for this product", "error");
            }
            if (err.msg === "Rating text minimum length 4 characters") {
              Notify("Rating text minimum length 4 characters", "error");
            }
            if (err.msg === "Rating text maximum length 50 characters") {
              Notify("Rating text maximum length 50 characters", "error");
            }

            if (err.msg === "Rating value must be between 1 to 5") {
              Notify("Rating value must be between 1 to 5", "error");
            }
          });
        }
      }
    }
  }, [loading]);

  return [
    handleChangeReviewText,
    handleChangeReviewRate,
    reviewText,
    reviewRate,
    user,
    handleSubmit,
  ];
};

export default AddReviewHook;
