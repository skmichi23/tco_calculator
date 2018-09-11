import React from "react";
import Questionare from "./Questionare.jsx";
import Report from "./Report.jsx";
import tcoCalculator from "../service/tcoCalculator";
import { questions } from "../store";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen
  }
});

function initState() {
  const initialState = { answers: {} };
  for (let question of questions) {
    initialState.answers[question.id] = question.defaultValue || "";
  }
  return initialState;
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState();
  }

  onQuestionareSubmit = () => {
    //send answers to service
    //get response with TCO data
    //set response data to the state

    const report = tcoCalculator(this.state.answers);
    console.log(report);
    this.setState({ report });
  };

  onModify = () => {
    this.setState({ report: null });
  };

  onAnswer = question => event => {
    let updatedState;
    if (question.onAnswer) {
      updatedState = question.onAnswer(event.target.value);
    } else {
      updatedState = { [question.id]: event.target.value };
    }
    this.setState({ answers: { ...this.state.answers, ...updatedState } });
  };

  onSliderChange = question => (event, value) => {
    let updatedState;
    if (question.onAnswer) {
      updatedState = question.onAnswer(value);
    } else {
      updatedState = { [question.id]: value };
    }

    this.setState({ answers: { ...this.state.answers, ...updatedState } });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {!this.state.report ? (
          <Questionare
            onSubmit={this.onQuestionareSubmit}
            onAnswer={this.onAnswer}
            onSliderChange={this.onSliderChange}
            answers={this.state.answers}
            questions={questions}
          />
        ) : null}
        {this.state.report ? (
          <Report report={this.state.report} onModify={this.onModify} />
        ) : null}
      </MuiThemeProvider>
    );
  }
}
