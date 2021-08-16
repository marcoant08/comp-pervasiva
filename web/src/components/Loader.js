import React from "react";
import "./styles.css";

function Loader(props) {
  return (
    <div className={`load ${props.center ? "center" : ""}`}>
      <div className="dot" style={{ background: props.color }}></div>
      <div className="dot" style={{ background: props.color }}></div>
      <div className="dot" style={{ background: props.color }}></div>
      <div className="dot" style={{ background: props.color }}></div>
    </div>
  );
}

export default Loader;
