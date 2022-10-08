import React from "react";
import {FormAvatar, FContainer, FormHeader} from "./formContainerStyles";
import {BsPersonFill} from "react-icons/bs";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const FormContainer = ({
  children,
  formHead,
  btnName,
  inquiry,
  link,
  linkTxt,
}) => {
  return (
    <FContainer className="m-auto p-5 position-relative">
      <FormAvatar>
        <BsPersonFill />
      </FormAvatar>
      <FormHeader>{formHead}</FormHeader>
      {children}

      <p>
        {inquiry}
        <Link to={link} style={{fontWeight: "900", fontFamily: "Helvetica"}}>
          {linkTxt}
        </Link>
      </p>
    </FContainer>
  );
};

export default FormContainer;
