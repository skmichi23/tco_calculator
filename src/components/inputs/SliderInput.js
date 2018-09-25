import React from "react";
import Slider from "rc-slider";
import NumberFormat from "react-number-format";

export default ({ question, onSliderChange, value }) => {
  return (
    <table cellPadding={0} cellSpacing={0} className="question">
      <thead>
        <tr>
          <th colSpan="3">{question.text}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="left">
            <NumberFormat
              value={question.config.min}
              displayType={"text"}
              thousandSeparator={" "}
              suffix={" " + question.config.unit}
              decimalSeparator={","}
            />
          </td>
          <td className="center">
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={" "}
              suffix={" " + question.config.unit}
              decimalSeparator={","}
            />
          </td>
          <td className="right">
            <NumberFormat
              value={question.config.max}
              displayType={"text"}
              thousandSeparator={" "}
              suffix={" " + question.config.unit}
              decimalSeparator={","}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <div className="slider-wrapper">
              <Slider
                value={value}
                onChange={onSliderChange}
                className="my-slider"
                min={question.config.min}
                max={question.config.max}
                step={question.config.step}
                marks={question.config.marks}
                railStyle={{ backgroundColor: "#E8E9EA", height: 5 }}
                trackStyle={{ backgroundColor: "#7FB14F", height: 5 }}
                handleStyle={{
                  backgroundColor: "#FEFFFF",
                  borderColor: "#7FB14F"
                }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
