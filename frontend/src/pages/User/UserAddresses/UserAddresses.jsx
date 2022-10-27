import React from "react";
import UserSidebar from "../../../components/User/UserSidebar/UserSidebar";
import SecContainer from "../../../layout/SecContainer/SecContainer";
import {Container, Row, Col} from "react-bootstrap";
import UserAddressesBlock from "../../../components/User/UserAddressesBlock/UserAddressesBlock";
import {ToastContainer} from "react-toastify";

const UserAddresses = () => {
  return (
    <SecContainer secName="user-profile-Sec" withMargin>
      <Container>
        <Row>
          <Col md={3} xs={12}>
            <UserSidebar />
          </Col>
          <Col md={9} xs={12}>
            <UserAddressesBlock />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </SecContainer>
  );
};

export default UserAddresses;
