import React from "react";
import Question from "./Question.jsx";
import Button from "@material-ui/core/Button";
import CalculateButton from "./inputs/CalculateButton";

export default class Questionare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h1>TOTAL COST OF OWNERSHIP</h1>
        <h2>CALCULATOR</h2>

        {this.props.questions.map(question => (
          <div key={question.id}>
            <Question
              onAnswer={this.props.onAnswer(question)}
              onSliderChange={this.props.onSliderChange(question)}
              onItemSelect={this.props.onItemSelect(question)}
              value={this.props.answers[question.id]}
              question={question}
            />
          </div>
        ))}
        <CalculateButton onClick={() => this.props.onSubmit()} />
      </React.Fragment>
    );
  }
}
