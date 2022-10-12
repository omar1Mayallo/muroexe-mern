import React, {useState} from "react";
import {Form} from "react-bootstrap";
import "./formInput.css";

const FormInput = ({errorMessage, handleChange, ...restProps}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <Form.Group className="py-2 inputGroup">
      <Form.Control
        onChange={handleChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        {...restProps}
      />

      <span className="error-message" style={{color: "red"}}>
        {errorMessage}
      </span>
    </Form.Group>
  );
};

export default FormInput;
