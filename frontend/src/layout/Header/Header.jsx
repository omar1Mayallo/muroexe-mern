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
import {useNavigate} from "react-router-dom";
import GetUserCartHook from "../../hooks/Cart/getUserCartHook";
const Header = () => {
  const [numOfItems] = GetUserCartHook();
  console.log(numOfItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const categoriesList =
    data &&
    data.docs.map(({_id, name, slug}) => (
      <LinkContainer to={`shop/category/${_id}`} key={_id}>
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
              {userInfo !== "" ? (
                <>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <div style={{position: "relative"}}>
                        <span
                          className="text-light d-flex align-items-center justify-content-center"
                          style={{
                            position: "absolute",
                            top: "-10px",
                            left: "-10px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "100%",
                            backgroundColor: "red",
                          }}
                        >
                          {numOfItems ? numOfItems : 0}
                        </span>
                        <BsCartFill style={{fontSize: "25px"}} />
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                  <div className="d-flex ">
                    <div>
                      <Image
                        src={userInfo.image}
                        className="rounded-circle"
                        style={{width: "50px", height: "50px"}}
                      />
                    </div>

                    <div>
                      <NavDropdown
                        title={userInfo.name.split(" ")[0]}
                        id="user"
                      >
                        {userInfo.role === "user" && (
                          <LinkContainer to="/user/profile">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                        )}
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
                </>
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
