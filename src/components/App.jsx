import React from "react";
import Questionare from "./Questionare.jsx";
import Report from "./Report.jsx";
import tcoCalculator from "../service/TcoCalculatorClass";
import { observer } from "mobx-react";

import "rc-slider/assets/index.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen
  }
});

const MyApp = observer(
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.initState();
    }

    initState() {
      const initialState = { answers: {} };
      // for (let question of tcoCalculator.questions) {
      //   initialState.answers[question.id] = question.defaultValue || "";
      // }
      return initialState;
    }

    onQuestionareSubmit = () => {
      const report = tcoCalculator.calculateTco(tcoCalculator.answers);
      this.setState({ report });
    };

    onModify = () => {
      this.setState({ report: null });
      window.scrollTo(0, 0);
    };

    onItemSelect = question => value => {
      let updatedState = { [question.id]: value };
      tcoCalculator.setAnswer(updatedState);
    };

    onAnswer = question => event => {
      let updatedState;
      if (question.onAnswer) {
        updatedState = question.onAnswer(event.target.value);
      } else {
        updatedState = { [question.id]: event.target.value };
      }
      tcoCalculator.setAnswer(updatedState);
      //this.setState({ answers: { ...this.state.answers, ...updatedState } });
    };

    onSliderChange = question => value => {
      let updatedState;
      if (question.onAnswer) {
        updatedState = question.onAnswer(value);
      } else {
        updatedState = { [question.id]: value };
      }

      //this.setState({ answers: { ...this.state.answers, ...updatedState } });
      tcoCalculator.setAnswer(updatedState);
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
              answers={tcoCalculator.answers}
              questions={tcoCalculator.questions}
            />
          ) : null}
          {this.state.report ? (
            <Report report={this.state.report} onModify={this.onModify} />
          ) : null}
        </MuiThemeProvider>
      );
    }
  }
);

export default MyApp;
