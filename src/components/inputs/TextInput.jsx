import React from "react";

export default ({ question, onAnswer, value }) => {
  return (
    <React.Fragment>
      <input
        onChange={onAnswer}
        type={(question.config && question.config.inputType) || "text"}
        value={value}
      />
    </React.Fragment>
  );
};
