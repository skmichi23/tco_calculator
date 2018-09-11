import React from "react";
import Question from "./Question.jsx";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default class Questionare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="headline">
          Cost of Ownership Questionare
        </Typography>

        <Paper>
          {this.props.questions.map(question => (
            <div key={question.id}>
              <Question
                onAnswer={this.props.onAnswer(question)}
                onSliderChange={this.props.onSliderChange(question)}
                value={this.props.answers[question.id]}
                question={question}
              />
            </div>
          ))}
          <center>
            <Button onClick={() => this.props.onSubmit()}>Calculate</Button>
          </center>
        </Paper>
      </React.Fragment>
    );
  }
}
