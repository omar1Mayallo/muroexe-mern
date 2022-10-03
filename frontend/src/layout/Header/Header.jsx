import React, {useEffect} from "react";
import Logo from "./Logo.jpg";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  Alert,
} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {BsCartFill, BsPersonFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../RTK/slices/categoriesSlice";
const Header = () => {
  const catagories = ["Sneakers", "Shoes", "Slippers", "Accessories"];
  const dispatch = useDispatch();
  const {loading, allCategories, error} = useSelector(
    (state) => state.categories
  );
  const {data} = allCategories;
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categoriesList =
    data &&
    data.docs.map(({_id, name, slug}) => (
      <LinkContainer to={`/categories/${slug}`} key={_id}>
        <NavDropdown.Item>{name.toUpperCase()}</NavDropdown.Item>
      </LinkContainer>
    ));
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
                {error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  categoriesList
                )}
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
