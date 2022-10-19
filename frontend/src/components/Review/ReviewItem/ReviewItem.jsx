import React from "react";
import {Badge, Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import Rating from "../../Utils/Rating/Rating";
import {AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import UpdateReviewHook from "../../../hooks/Review/updateReviewHook";
import ReactStars from "react-rating-stars-component";
import {MdStar, MdStarHalf, MdStarBorder} from "react-icons/md";
import DeleteReviewHook from "../../../hooks/Review/deleteReviewHook";
const ReviewItem = ({rev}) => {
  const [
    onChangeNewReviewText,
    onChangeNewReviewValue,
    newReviewText,
    newReviewValue,
    handleEdit,
    showEditModal,
    handleCloseEditModal,
    handleShowEditModal,
  ] = UpdateReviewHook(rev);
  const [
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    handleDelete,
  ] = DeleteReviewHook(rev);

  let user;
  if (localStorage.getItem("user") !== null) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const setting = {
    size: 40,
    count: 5,
    color: "yellow",
    activeColor: "yellow",
    value: newReviewValue,
    a11y: true,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
    onChange: (newValue) => {
      onChangeNewReviewValue(newValue);
    },
  };
  return (
    <div className="my-3">
      {/* EDIT Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars {...setting} />
          <Form.Group className="py-2 inputGroup">
            <Form.Control
              onChange={onChangeNewReviewText}
              value={newReviewText}
              type="text"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* DELETE Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Do You Sure to Remove Your Review ?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Row style={{position: "relative"}}>
        <Col xs={1}>
          <Image
            src={rev.user.image}
            alt="user-image"
            className="rounded-circle"
            style={{width: "70px", height: "70px", border: "3px solid white"}}
          />
        </Col>
        <Col xs={11}>
          <Row
            className="p-3"
            style={{background: "white", borderRadius: "20px"}}
          >
            <Col xs={11}>
              <div>
                <h5 style={{margin: 0}}>{rev.user.name}</h5>
                <div className="my-2 d-flex align-items-center">
                  <Rating size={25} ratingAvr={rev.rating} />
                  <span className="ms-2" style={{fontSize: "12px"}}>
                    {rev.updatedAt.substring(0, 10)}
                  </span>
                </div>
                <div>
                  <p>{rev.review}</p>
                </div>
              </div>
            </Col>
            <Col xs={1}>
              {user && user._id === rev.user._id && (
                <>
                  <div className="text-center mb-2">
                    <Badge
                      bg="danger"
                      style={{
                        border: "5px solid whitesmoke",
                        cursor: "pointer",
                      }}
                    >
                      <AiOutlineClose
                        size="20px"
                        onClick={handleShowDeleteModal}
                      />
                    </Badge>
                  </div>
                  <div className="text-center mb-2">
                    <Badge
                      bg="info"
                      style={{
                        border: "5px solid whitesmoke",
                        cursor: "pointer",
                      }}
                    >
                      <AiOutlineEdit
                        size="20px"
                        onClick={handleShowEditModal}
                      />
                    </Badge>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <div className="d-flex align-items-center  user-Info">
          <Image
            src={rev.user.image}
            alt="user-image"
            className="rounded-circle"
            style={{width: "50px", height: "50px"}}
          />
          <div className="d-flex flex-column justify-content-center">
            <h6>{rev.user.name}</h6>
            <span>{rev.createdAt.substring(0, 10)}</span>
          </div>
        </div>
        <div>
          <div>
            <Rating size={20} ratingAvr={rev.rating} />
          </div>
          <p>{rev.review}</p>
        </div> */}
    </div>
  );
};

export default ReviewItem;
