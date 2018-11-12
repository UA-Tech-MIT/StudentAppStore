import React from "react";
import { Icon } from "semantic-ui-react";

const RightArrow = proper => {
  return (
    <div className="nextArrow" onClick={proper.goToNextSlide}>
      <Icon name="right arrow" />
    </div>
  );
};

export default RightArrow;
