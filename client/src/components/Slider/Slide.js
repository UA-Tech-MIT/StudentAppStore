import React, { Component } from "react";

const Slide = proper => {
  const styles = {
    backgroundImage: `url(${proper.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };
  return <div className="slide" style={styles} />;
};

export default Slide;
