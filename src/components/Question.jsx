import React from "react";
import TextInput from "./inputs/TextInput";
import SelectInput2 from "./inputs/SelectInput2";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import SliderInput from "./inputs/SliderInput";
import SelectWithImage from "./inputs/SelectWithImage";
import ChooseInput from "./inputs/ChooseInput";

export default ({
  question,
  onAnswer,
  onSliderChange,
  onItemSelect,
  value
}) => {
  return (
    <div>
      {(() => {
        switch (question.type) {
          case "input":
            return (
              // <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="subheading" component="h2">
                      {question.text}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <TextInput
                      question={question}
                      value={value}
                      onAnswer={onAnswer}
                    />
                  </CardContent>
                </Grid>
              </Grid>
              // </Card>
            );
          case "selectWithImg":
            return (
              <SelectWithImage
                question={question}
                value={value}
                onAnswer={onAnswer}
              />
            );
          case "select":
            return (
              <ChooseInput
                question={question}
                value={value}
                onItemSelect={onItemSelect}
              />
            );
          case "select2":
            return (
              // <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="subheading" component="h2">
                      {question.text}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <SelectInput2
                      question={question}
                      value={value}
                      onAnswer={onAnswer}
                    />
                  </CardContent>
                </Grid>
              </Grid>
              // </Card>
            );
          case "slider":
            return (
              <SliderInput
                question={question}
                onSliderChange={onSliderChange}
                value={value}
              />
            );
          case "slider2":
            return (
              // <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="subheading" component="h2">
                      {question.text}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <center>
                      <Typography id="label">
                        {value} {question.config.unit}
                      </Typography>
                    </center>
                    <Slider
                      min={question.config.min}
                      max={question.config.max}
                      onChange={onSliderChange}
                      step={question.config.step}
                      value={value}
                      marks={question.config.marks}
                    />
                  </CardContent>
                </Grid>
              </Grid>
              // </Card>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
