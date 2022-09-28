import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const SectionHead = ({head}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center">
      <h4>{head}</h4>
      <div className="ms-auto">
        <Button size="sm" onClick={() => navigate("/shop")}>
          Show More
        </Button>
      </div>
    </div>
  );
};

export default SectionHead;
