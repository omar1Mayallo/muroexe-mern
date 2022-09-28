import React from "react";
import {Container, Row, Col, Image, Form, Button} from "react-bootstrap";
import FormContainer from "../../layout/FormContainer/FormContainer";
import FormInput from "../../components/FormInput/FormInput";

const Register = () => {
  return (
    <section className="my-5 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col className="text-center">
            <FormContainer
              formHead="Register"
              btnName="Register"
              inquiry="Already have an account?"
              link="/login"
              linkTxt="Login now"
            >
              <Form onSubmit={console.log("HelloWorld")}>
                <FormInput type="text" placeholder="Name" required />
                <FormInput type="email" placeholder="Email" required />
                <FormInput type="password" placeholder="Password" required />
                <FormInput
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
