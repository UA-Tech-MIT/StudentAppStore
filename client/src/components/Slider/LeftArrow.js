import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

const LeftArrow = proper => {
  return (
    <div className="backArrow" onClick={proper.goToPrevSlide}>
      <Icon name="left arrow" />
    </div>
  );
};

export default LeftArrow;
