import React from "react";
import {Alert} from "react-bootstrap";
import ReviewItem from "../../components/Review/ReviewItem/ReviewItem";
import Pagination from "../../components/Utils/Pagination/Pagination";

import Spinner from "../../components/Utils/Spinner/Spinner";
import ViewReviewsProductHook from "../../hooks/Review/viewReviewsProduct";
import SecContainer from "../../layout/SecContainer/SecContainer";

const SecReviews = ({id, numReviews}) => {
  const [reviewItems, loading, error, onPress, limit] =
    ViewReviewsProductHook(id);

  let pagesCount = 0;
  if (numReviews) {
    pagesCount = Math.ceil(numReviews / limit);
  }

  return (
    <SecContainer secName="reviews-Sec" withMargin>
      <h3>Reviews</h3>
      {error ? (
        <Alert variant="error">{error}</Alert>
      ) : loading ? (
        <Spinner />
      ) : reviewItems && reviewItems.length ? (
        <div className="p-3" style={{backgroundColor: "whitesmoke"}}>
          {reviewItems.map((rev, idx) => (
            <ReviewItem key={idx} rev={rev} />
          ))}
        </div>
      ) : (
        <Alert variant="info">No reviews yet</Alert>
      )}
      {numReviews > limit && (
        <div className="my-2">
          <Pagination pageNumbers={pagesCount} onPress={onPress} />
        </div>
      )}
    </SecContainer>
  );
};

export default SecReviews;
