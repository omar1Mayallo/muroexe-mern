import React from "react";
import {RingLoader} from "react-spinners";

const Spinner = () => {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{minHeight: "300px"}}
    >
      <RingLoader color="#000000" loading size={60} speedMultiplier={1} />
    </div>
  );
};

export default Spinner;
