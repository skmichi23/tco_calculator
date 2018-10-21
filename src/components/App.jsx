import React from "react";
import Questionare from "./Questionare.jsx";
import Report from "./Report.jsx";
import tcoCalculator from "../service/tcoCalculator";
import { questions } from "../store";

import "rc-slider/assets/index.css";
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

  componentDidMount = () => {
    console.log("component did mount");
  };

  onQuestionareSubmit = () => {
    const report = tcoCalculator(this.state.answers);
    this.setState({ report });
  };

  onModify = () => {
    this.setState({ report: null });
    window.scrollTo(0, 0);
  };

  onItemSelect = question => value => {
    let updatedState = { [question.id]: value };
    this.setState({ answers: { ...this.state.answers, ...updatedState } });
  };

  onAnswer = question => event => {
    let updatedState;
    if (question.onAnswer) {
      updatedState = question.onAnswer(event.target.value);
      console.log(updatedState);
    } else {
      updatedState = { [question.id]: event.target.value };
    }
    this.setState({ answers: { ...this.state.answers, ...updatedState } });
  };

  onSliderChange = question => value => {
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
            onItemSelect={this.onItemSelect}
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
