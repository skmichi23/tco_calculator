import React from "react";
import Questionare from "./Questionare.jsx";
import Report from "./Report.jsx";
import tcoCalculator from "../service/tcoCalculator";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onQuestionareSubmit = answers => {
    //send answers to service
    //get response with TCO data
    //set response data to the state

    const report = tcoCalculator(answers);
    console.log(report);
    this.setState({ report });
  };

  render() {
    return (
      <React.Fragment>
        <Questionare onSubmit={this.onQuestionareSubmit} />
        {this.state.report ? <Report report={this.state.report} /> : null}
      </React.Fragment>
    );
  }
}
