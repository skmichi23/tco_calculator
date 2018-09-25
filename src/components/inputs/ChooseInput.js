import React from "react";
import Icon from "react-fa";

export default ({ question, value, onItemSelect }) => {
  return (
    <table cellPadding={0} cellSpacing={0} className="question">
      <thead>
        <tr>
          <th>{question.text}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <ol type="A" className="choose">
            {question.config.options.map(option => (
              <li
                key={option.value}
                className={option.value === value ? "chosen" : ""}
                onClick={_ => onItemSelect(option.value)}
              >
                <p>
                  <span className="letter">{option.number}</span>
                  {option.title}
                </p>
                {option.value === value && (
                  <Icon
                    name="check-circle"
                    size="2x"
                    className="choose-checked"
                  />
                )}
              </li>
            ))}
          </ol>
        </tr>
      </tbody>
    </table>
  );
};
