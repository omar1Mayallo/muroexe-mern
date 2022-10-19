import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateReview} from "../../RTK/slices/reviewsSlice";
import Notify from "../useNotification";
const UpdateReviewHook = (rev) => {
  const dispatch = useDispatch();
  const [newReviewText, setNewReviewText] = useState(rev.review);
  const [newReviewValue, setNewReviewValue] = useState(rev.rating);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const onChangeNewReviewText = (e) => {
    setNewReviewText(e.target.value);
  };
  const onChangeNewReviewValue = (value) => {
    setNewReviewValue(value);
  };

  const handleEdit = () => {
    dispatch(
      updateReview({
        productId: rev._id,
        body: {review: newReviewText, rating: newReviewValue},
      })
    );
    handleCloseEditModal();
  };
  const {reviewChanged, loading, error} = useSelector(
    (state) => state.reviews.reviewUpdated
  );

  useEffect(() => {
    if (loading === false) {
      if (reviewChanged !== []) {
        if (reviewChanged.status && reviewChanged.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        Notify("Something went wrong while updated", "error");
      }
    }
  }, [loading]);

  return [
    onChangeNewReviewText,
    onChangeNewReviewValue,
    newReviewText,
    newReviewValue,
    handleEdit,
    showEditModal,
    handleCloseEditModal,
    handleShowEditModal,
  ];
};

export default UpdateReviewHook;
