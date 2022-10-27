import React from "react";
import {Row, Col, Modal, Button, Image} from "react-bootstrap";
import FormInput from "../../Utils/FormInput/FormInput";
import UserInfoHook from "../../../hooks/User/userInfoHook";

const UserInfoBlock = () => {
  const [
    //Modals
    handleInfoClose,
    handleInfoShow,
    handlePasswordClose,
    handlePasswordShow,
    showInfoModal,
    showPasswordModal,

    //user
    user,
    //Info
    name,
    email,
    // image,
    handleNameChange,
    handleEmailChange,
    // handleImageChange,
    handleInfoChange,
    //Password
    oldPassword,
    newPassword,
    confirmNewPassword,
    handleChangeOldPassword,
    handleChangeNewPassword,
    handleChangeConfirmNewPassword,
    handlePasswordChange,
  ] = UserInfoHook();
  return (
    <div className="p-3 bg-light">
      <h2>User Profile</h2>
      <Modal show={showPasswordModal} onHide={handlePasswordClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            name="currentPassword"
            placeholder="Current Password"
            type="password"
            value={oldPassword}
            onChange={handleChangeOldPassword}
          />
          <FormInput
            name="newPassword"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={handleChangeNewPassword}
          />
          <FormInput
            name="newPasswordConfirmation"
            placeholder="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={handleChangeConfirmNewPassword}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePasswordClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ///////////////////////////////////////// */}
      <Modal show={showInfoModal} onHide={handleInfoClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            name="name"
            value={name}
            type="text"
            onChange={handleNameChange}
          />
          <FormInput
            name="email"
            value={email}
            type="email"
            onChange={handleEmailChange}
          />
          {/* <Form.Group controlId="formFile" className="my-4">
            <Form.Control
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInfoClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleInfoChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-1 p-2">
        <Row>
          <Col className="my-3">
            <Row className="align-items-center">
              <Col
                md={7}
                xs={12}
                className="bg-light p-3 d-flex align-items-center"
              >
                <div className="text-center">
                  <Image
                    src={user.image}
                    alt="profile-image"
                    className="rounded-circle"
                    fluid
                    width="150"
                    height="150"
                  />
                </div>
                <div className="ms-3">
                  <div className="my-2 d-flex">
                    <div>Name :</div>
                    <div className="ms-2">{user.name}</div>
                  </div>
                  <div className="my-2 d-flex">
                    <div>Email :</div>
                    <div className="ms-2">{user.email}</div>
                  </div>
                </div>
              </Col>
              <Col md={5} xs={12}>
                <Button className="w-100 my-2" onClick={handleInfoShow}>
                  Edit
                </Button>
                <Button
                  className="w-100 my-2"
                  variant="info"
                  onClick={handlePasswordShow}
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserInfoBlock;
