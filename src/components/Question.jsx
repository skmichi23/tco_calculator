import React from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";

export default ({ question, onAnswer, value }) => {
  switch (question.type) {
    case "input":
      return (
        <TextInput question={question} value={value} onAnswer={onAnswer} />
      );
    case "select":
      return (
        <SelectInput question={question} value={value} onAnswer={onAnswer} />
      );
    default:
      return null;
  }
};
