import React from "react";
import Questionare from "./Questionare.jsx";
import Report from "./Report.jsx";
import tcoCalculator from "../service/tcoCalculator";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen
  }
});

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

  onModify = () => {
    this.setState({ report: null });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {!this.state.report ? (
          <Questionare onSubmit={this.onQuestionareSubmit} />
        ) : null}
        {this.state.report ? (
          <Report report={this.state.report} onModify={this.onModify} />
        ) : null}
      </MuiThemeProvider>
    );
  }
}
