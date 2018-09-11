import React from "react";
import Input from "@material-ui/core/Input";

export default ({ question, onAnswer, value }) => {
  return (
    <React.Fragment>
      <Input
        onChange={onAnswer}
        type={(question.config && question.config.inputType) || "text"}
        value={value}
      />
    </React.Fragment>
  );
};
