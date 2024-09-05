import React from "react";
import "./index.css";

type Props = {};

const ImageSpinner = (props: Props) => {
  return (
    <div className="wrapper">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  );
};

export default ImageSpinner;
