import React from "react";
import Question from "./Question.jsx";
import CalculateButton from "./inputs/CalculateButton";
import { observer } from "mobx-react";

const ObservableQuestionare = observer(
  class Questionare extends React.Component {
    render() {
      return (
        <React.Fragment>
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
);

export default ObservableQuestionare;
