import React from "react";
import Logo from "./Logo.jpg";
import {Navbar, Container, Nav, NavDropdown, Image} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {BsCartFill, BsPersonFill} from "react-icons/bs";

const Header = () => {
  const catagories = ["Sneakers", "Shoes", "Slippers", "Accessories"];

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={Logo} alt="Logo" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/brands">
                <Nav.Link>Brands</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Catagories" id="basic-nav-dropdown">
                {catagories.map((c) => (
                  <LinkContainer to={`/categories/${c.toLowerCase()}`} key={c}>
                    <NavDropdown.Item>{c.toUpperCase()}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <BsCartFill style={{fontSize: "25px"}} />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <BsPersonFill style={{fontSize: "25px"}} />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
