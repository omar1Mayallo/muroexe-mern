import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteReview} from "../../RTK/slices/reviewsSlice";
import Notify from "../useNotification";

const DeleteReviewHook = (rev) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = () => {
    dispatch(deleteReview(rev._id));
    handleCloseDeleteModal();
  };

  const {reviewRemoved, loading, error} = useSelector(
    (state) => state.reviews.reviewDeleted
  );

  useEffect(() => {
    if (loading === false) {
      if (reviewRemoved !== []) {
        if (reviewRemoved === "") {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        Notify("Something went wrong while Deleting", "error");
      }
    }
  }, [loading]);

  return [
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    handleDelete,
  ];
};

export default DeleteReviewHook;
