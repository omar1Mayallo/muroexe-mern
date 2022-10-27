import React from "react";
import UserInfoBlock from "../../../components/User/UserInfoBlock/UserInfoBlock";
import UserSidebar from "../../../components/User/UserSidebar/UserSidebar";
import SecContainer from "../../../layout/SecContainer/SecContainer";
import {Container, Row, Col} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
const UserProfile = () => {
  return (
    <SecContainer secName="user-profile-Sec" withMargin>
      <Container>
        <Row>
          <Col md={3} xs={12}>
            <UserSidebar />
          </Col>
          <Col md={9} xs={12}>
            <UserInfoBlock />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </SecContainer>
  );
};

export default UserProfile;
