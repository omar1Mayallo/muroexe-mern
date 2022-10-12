import React from "react";

const PageHeadSection = ({pageTitle, pageDescription}) => {
  return (
    <div className="my-5">
      <h2>{pageTitle}</h2>
      <p>{pageDescription}</p>
    </div>
  );
};

export default PageHeadSection;
