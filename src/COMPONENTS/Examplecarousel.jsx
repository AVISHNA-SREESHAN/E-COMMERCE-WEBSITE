import React from "react";

const ExampleCarouselImage = ({ text, image }) => {
  return (
    <img
      className="d-block w-100"
      src={image}
      alt={text}
      style={{ height: "200px" }}
    />
  );
};

export default ExampleCarouselImage;