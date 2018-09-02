import React from "react";
import Question from "./Question.jsx";
import { questions } from "../store";

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

  onAnswer = question => event => {
    let updatedState;
    if (question.onAnswer) {
      updatedState = question.onAnswer(event.target.value);
    } else {
      updatedState = { [question.id]: event.target.value };
    }
    this.setState({ answers: { ...this.state.answers, ...updatedState } });
  };

  render() {
    return (
      <React.Fragment>
        {questions.map(question => (
          <div key={question.id}>
            <Question
              onAnswer={this.onAnswer(question)}
              value={this.state.answers[question.id]}
              question={question}
            />
          </div>
        ))}
        <button onClick={() => this.props.onSubmit(this.state.answers)}>
          abcd
        </button>
      </React.Fragment>
    );
  }
}
