import React from "react";

function Loading({ width, height }) {
  return (
    <div
      className="Loading"
      style={{
        width,
        height,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
}
Loading.defaultProps = {
  width: "28px",
  height: "28px",
};

export default Loading;
