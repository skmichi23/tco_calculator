import React from "react";

export default ({ question, value, onAnswer }) => {
  return (
    <React.Fragment>
      <label>{question.text}</label>
      <select value={value} onChange={onAnswer}>
        <option value="">Please select</option>
        {question.config.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};
