import React, {useEffect} from "react";
import {Container, Row, Col, Form, Button, Spinner} from "react-bootstrap";
import FormContainer from "../../layout/FormContainer/FormContainer";
import FormInput from "../../components/Utils/FormInput/FormInput";
import registerInputs from "./registerInputs";
import {RegisterHook} from "../../hooks/Auth/registerHook";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [values, handleChange, handleSubmit, handleImageChange, loading] =
    RegisterHook();
  const inputs = registerInputs(values);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <section className="my-5 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col className="text-center">
            <FormContainer
              formHead="Register"
              inquiry="Already have an account?"
              link="/login"
              linkTxt="Login now"
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

                <Form.Group controlId="formFile" className="my-4">
                  <Form.Control
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                {loading ? (
                  <Button className="my-4" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Registering...
                  </Button>
                ) : (
                  <Button className="my-4" type="submit">
                    Register
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

export default Register;
