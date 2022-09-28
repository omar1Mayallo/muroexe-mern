import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import SecContainer from "../../layout/SecContainer/SecContainer";
import {LinkContainer} from "react-router-bootstrap";

import subBannerOne from "../../images/Banners/sub-banner-1.jpg";
import subBannerTwo from "../../images/Banners/sub-banner-2.jpg";

const SecSubBanners = () => {
  return (
    <SecContainer secName="subBanners-Sec" withMargin>
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <LinkContainer
              to="/shop"
              className="p-2"
              style={{cursor: "pointer"}}
            >
              <Image src={subBannerOne} alt="sub-banner-img" fluid />
            </LinkContainer>
          </Col>
          <Col md={6} sm={12}>
            <LinkContainer
              to="/shop"
              className="p-2"
              style={{cursor: "pointer"}}
            >
              <Image src={subBannerTwo} alt="sub-banner-img" fluid />
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </SecContainer>
  );
};

export default SecSubBanners;
