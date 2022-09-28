import React from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import FormContainer from "../../layout/FormContainer/FormContainer";
import FormInput from "../../components/FormInput/FormInput";

const Login = () => {
  return (
    <section className="my-5 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col className="text-center">
            <FormContainer
              formHead="Login"
              btnName="Login"
              inquiry="Don't have account?,"
              link="/register"
              linkTxt="Register Now"
            >
              <Form onSubmit={console.log("HelloWorld")}>
                <FormInput type="email" placeholder="Email" required />
                <FormInput type="password" placeholder="Password" required />
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
