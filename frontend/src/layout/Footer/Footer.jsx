import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MdKeyboardArrowRight, MdMail} from "react-icons/md";
import {
  BsTelephoneFill,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import {ListItem, ItemsHead} from "./footerStyles";
import {LinkContainer} from "react-router-bootstrap";
import Apple from "./apple.png";
import GooglePlay from "./googlePlay.png";

const Footer = () => {
  return (
    <footer className="py-5" style={{backgroundColor: "#f8f8f8"}}>
      <Container>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <ItemsHead>Muroexe World</ItemsHead>
            <ul>
              <ListItem>
                <Link>
                  <MdKeyboardArrowRight />
                  About us
                </Link>
              </ListItem>
              <ListItem>
                <MdKeyboardArrowRight />
                <Link>Design process</Link>
              </ListItem>
              <ListItem>
                <MdKeyboardArrowRight />
                <Link>Blog</Link>
              </ListItem>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ItemsHead>Information</ItemsHead>
            <ul>
              <ListItem>
                <Link>
                  <MdKeyboardArrowRight />
                  Legal notice and privacy policy
                </Link>
              </ListItem>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ItemsHead>Buy guide</ItemsHead>
            <ul>
              <ListItem>
                <Link>
                  <MdKeyboardArrowRight />
                  Choose your size
                </Link>
              </ListItem>
              <ListItem>
                <MdKeyboardArrowRight />
                <Link>Frequently asked questions</Link>
              </ListItem>
              <ListItem>
                <MdKeyboardArrowRight />
                <Link>Shipping and Returns</Link>
              </ListItem>
            </ul>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <ItemsHead>Contact us</ItemsHead>
            <ul>
              <ListItem>
                <BsTelephoneFill />
                <span>971 265 325</span>
              </ListItem>
              <ListItem>
                <MdMail />
                <span>user@user.com</span>
              </ListItem>
              <ListItem>
                <span>Monday to Friday, from 09h to 18h.</span>
              </ListItem>
              <ListItem>
                <span>© Copyright OTM 2022. All rights reserved.</span>
              </ListItem>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={12} md={4}>
            <Row className="text-center pb-5">
              <Col>
                <BsFacebook
                  style={{
                    fontSize: "30px",
                    color: "#3b5998",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col>
                <BsTwitter
                  style={{
                    fontSize: "30px",
                    color: "#1da1f2",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col>
                <BsInstagram
                  style={{
                    fontSize: "30px",
                    color: "#3b5998",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col>
                <BsLinkedin
                  style={{
                    fontSize: "30px",
                    color: "#0072b1",
                    cursor: "pointer",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={8}>
            <Row className="text-center">
              <Col>
                <span>
                  Muroexe APP Discover exclusive benefits by downloading the APP
                </span>
              </Col>
              <Col>
                <LinkContainer to="/" style={{cursor: "pointer"}}>
                  <Image src={Apple} alt="apple" />
                </LinkContainer>
                <LinkContainer to="/" style={{cursor: "pointer"}}>
                  <Image src={GooglePlay} alt="GooglePlay" />
                </LinkContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
