import React from "react";
import {Badge, Button, Modal} from "react-bootstrap";
import {AiOutlineClose} from "react-icons/ai";
import RemoveAddressHook from "../../hooks/Address/removeAddressHook";
const AddressItem = ({item}) => {
  const [
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    handleDelete,
  ] = RemoveAddressHook(item);
  return (
    <>
      {/* REMOVE ADDRESS MODAL */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you sure for deleting this address ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="p-2 bg-light my-3 d-flex justify-content-between">
        <div>
          <p>City : {item.city}</p>
          <p>Details : {item.details}</p>
          <p>Phone Number : {item.phone}</p>
          <p>Postal Code : {item.postalCode}</p>
        </div>
        <div>
          <div className="text-center mb-2">
            <Badge
              bg="danger"
              style={{
                border: "5px solid whitesmoke",
                cursor: "pointer",
              }}
            >
              <AiOutlineClose size="20px" onClick={handleShowDeleteModal} />
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressItem;
