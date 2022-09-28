import React from "react";
import {Form} from "react-bootstrap";

const FormInput = ({handleChange, ...restProps}) => {
  return (
    <Form.Group className="py-2">
      <Form.Control onChange={handleChange} {...restProps} />

      <span className="bar"></span>
    </Form.Group>
  );
};

export default FormInput;
