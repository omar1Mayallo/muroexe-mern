import React from "react";

const SecContainer = ({secName, children, withMargin}) => {
  return (
    <section className={`${secName}${withMargin ? " my-5" : ""}`}>
      {children}
    </section>
  );
};

export default SecContainer;
