import React, {useEffect, useState} from "react";
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
import Spinner from "../../components/Utils/Spinner/Spinner";
const Header = () => {
  const dispatch = useDispatch();
  const {loading, allCategories, error} = useSelector(
    (state) => state.categories
  );

  const [userInfo, setUserInfo] = useState("");

  const {data} = allCategories;
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserInfo("");
  };

  const categoriesList =
    data &&
    data.docs.map(({_id, name, slug}) => (
      <LinkContainer to={`shop/categories/${slug}`} key={_id}>
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
              <LinkContainer to="/shop/brands">
                <Nav.Link>Brands</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Catagories" id="basic-nav-dropdown">
                {error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : loading ? (
                  <Spinner />
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
              {userInfo !== "" ? (
                <div className="d-flex ">
                  <div>
                    <Image
                      src={userInfo.image}
                      className="rounded-circle"
                      style={{width: "50px", height: "50px"}}
                    />
                  </div>

                  <div>
                    <NavDropdown title={userInfo.name.split(" ")[0]} id="user">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      {userInfo.role === "admin" && (
                        <LinkContainer to="/admin">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <NavDropdown.Item onClick={logout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </div>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <BsPersonFill style={{fontSize: "25px"}} />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
