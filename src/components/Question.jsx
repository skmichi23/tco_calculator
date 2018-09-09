import React from "react";
import TextInput from "./inputs/TextInput";
import SelectInput2 from "./inputs/SelectInput2";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

export default ({ question, onAnswer, onSliderChange, value }) => {
  return (
    <div>
      {(() => {
        switch (question.type) {
          case "input":
            return (
              <div style={{ "margin-bottom": 50 }}>
                <Typography variant="title" component="h2">
                  {question.text}
                </Typography>
                <TextInput
                  question={question}
                  value={value}
                  onAnswer={onAnswer}
                />
              </div>
            );
          case "select":
            return (
              <div style={{ "margin-bottom": 50 }}>
                <Typography variant="title" component="h2">
                  {question.text}
                </Typography>
                <SelectInput2
                  question={question}
                  value={value}
                  onAnswer={onAnswer}
                />
              </div>
            );
          case "slider":
            return (
              <div style={{ "margin-bottom": 50 }}>
                <Typography variant="title" component="h2">
                  {question.text}
                </Typography>
                <center>
                  <Typography id="label">{value}</Typography>
                </center>
                <Slider
                  style={{ width: "100%" }}
                  min={question.config.min}
                  max={question.config.max}
                  onChange={onSliderChange}
                  step={question.config.step}
                  value={value}
                  marks={question.config.marks}
                />
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
