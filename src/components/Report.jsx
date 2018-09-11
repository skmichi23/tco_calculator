import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles, Typography } from "@material-ui/core";
import ResultsTable from "./ResultsTable";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function Report({ report, classes }) {
  return (
    <React.Fragment>
      <Typography variant="headline">Total Cost of Ownership Report</Typography>
      <ResultsTable data={report} />
    </React.Fragment>
  );
}

export default withStyles(styles)(Report);
