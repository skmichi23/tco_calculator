import React from "react";
import Question from "./Question.jsx";
import { questions } from "../store";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

function initState() {
  const initialState = { answers: {} };
  for (let question of questions) {
    initialState.answers[question.id] = question.defaultValue || "";
  }
  return initialState;
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Questionare extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState();
  }

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
    const { classes } = this.props;

    return (
      <div>
        {questions.map(question => (
          <div key={question.id}>
            <Question
              onAnswer={this.onAnswer(question)}
              onSliderChange={this.onSliderChange(question)}
              value={this.state.answers[question.id]}
              question={question}
            />
          </div>
        ))}
        <center>
          <Button onClick={() => this.props.onSubmit(this.state.answers)}>
            Calculate
          </Button>
        </center>
      </div>
    );
  }
}

export default withStyles(styles)(Questionare);
