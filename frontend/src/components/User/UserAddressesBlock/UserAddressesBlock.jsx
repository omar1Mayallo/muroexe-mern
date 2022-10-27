import React from "react";
import {Row, Col, Modal, Button, Alert, Badge} from "react-bootstrap";
import {AiOutlinePlus} from "react-icons/ai";
import AddReviewHook from "../../../hooks/Address/addAddressHook";
import GetUserAddressesHook from "../../../hooks/Address/getAddressesHook";
import FormInput from "../../Utils/FormInput/FormInput";
import Spinner from "../../Utils/Spinner/Spinner";

import AddressItem from "../../Address/AddressItem";

const UserAddressesBlock = () => {
  const [
    show,
    handleClose,
    handleShow,
    city,
    details,
    phone,
    postalCode,
    handleChangeCity,
    handleChangeDetails,
    handleChangePhone,
    handleChangePostalCode,
    handleSubmit,
  ] = AddReviewHook();
  const [addressItems, loading, error] = GetUserAddressesHook();
  console.log(addressItems);
  return (
    <div className="p-3 bg-light">
      {/* ADD ADDRESS MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            type="text"
            value={city}
            handleChange={handleChangeCity}
            placeholder="City"
          />
          <FormInput
            type="text"
            value={details}
            handleChange={handleChangeDetails}
            placeholder="Address In Details"
          />
          <FormInput
            type="text"
            value={phone}
            handleChange={handleChangePhone}
            placeholder="Phone Number"
          />
          <FormInput
            type="text"
            value={postalCode}
            handleChange={handleChangePostalCode}
            placeholder="Postal Code"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>User Addresses</h2>
      {loading ? (
        <Spinner />
      ) : addressItems && addressItems.length ? (
        addressItems.map((item, idx) => (
          <div key={idx}>
            <AddressItem item={item} />
          </div>
        ))
      ) : (
        <Alert variant="info">No Addresses Added Yet</Alert>
      )}

      <div
        onClick={handleShow}
        className="Icon-Add d-flex justify-content-end my-2"
      >
        <span
          style={{
            borderRadius: "100%",
            cursor: "pointer",
            border: "2px solid black",
          }}
        >
          <AiOutlinePlus size={40} color={"black"} />
        </span>
      </div>
    </div>
  );
};

export default UserAddressesBlock;
