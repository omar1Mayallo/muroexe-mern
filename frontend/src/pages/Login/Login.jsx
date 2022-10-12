import React, {useEffect} from "react";
import {Container, Row, Col, Form, Button, Spinner} from "react-bootstrap";
import FormContainer from "../../layout/FormContainer/FormContainer";
import FormInput from "../../components/Utils/FormInput/FormInput";
import {ToastContainer} from "react-toastify";
import inputs from "./loginInputs";
import {LoginHook} from "../../hooks/Auth/loginHook";
import {useNavigate} from "react-router-dom";
const Login = () => {
  const [values, handleChange, handleSubmit, loading] = LoginHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="my-5 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col className="text-center">
            <FormContainer
              formHead="Login"
              inquiry="Don't have account?,"
              link="/register"
              linkTxt="Register Now"
            >
              <Form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                  <FormInput
                    key={input.name}
                    {...input}
                    value={values[input.name]}
                    onChange={handleChange}
                  />
                ))}
                {loading ? (
                  <Button className="my-4" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Logging...
                  </Button>
                ) : (
                  <Button className="my-4" type="submit">
                    Login
                  </Button>
                )}
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default Login;
