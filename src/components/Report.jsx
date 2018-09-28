import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import ResultsTable from "./ResultsTable";
import Grid from "@material-ui/core/Grid";
import ResultChart from "./ResultChart";
import ModifyButton from "./inputs/ModifyButton";
import NumberFormat from "react-number-format";

const styles = theme => ({
  resultHeader: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 500
  },
  savings: {
    margin: "20px 30px 60px 30px",
    textAlign: "center",
    background: "#72b33c",
    minWidth: 150,
    padding: "5px 20px",
    fontSize: 30,
    color: "white",
    fontWeight: 900,
    borderRadius: 15,
    position: "relative"
  },
  percTag: {
    width: 70,
    height: 70,
    position: "absolute",
    right: -55,
    bottom: -55
  }
});

class Report extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { report, onModify, classes } = this.props;
    return (
      <React.Fragment>
        <h2>COMPARISON TO VOLTIA MAXI</h2>
        <ResultsTable data={report} onModify={onModify} />
        <br />
        <h2>Total savings over the wholetime operation</h2>
        <Paper>
          <Grid container justify="space-around">
            <Grid item>
              <p className={classes.resultHeader}>Money savings</p>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className={classes.savings}>
                    -{report.savings}%
                    <img
                      alt=""
                      className={classes.percTag}
                      src="./images/other/percenta.svg"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={classes.savings}>
                    <NumberFormat
                      value={-report.totalSavings}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix={" €"}
                      decimalSeparator={","}
                    />

                    <img
                      alt=""
                      className={classes.percTag}
                      src="./images/other/eur-tag.png"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <p className={classes.resultHeader}>
                {report.treesSaved} trees saved
              </p>
              <div>
                <img alt="" src="./images/other/stromceky.png" />
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container>
          <Grid item xs={6} md={6}>
            <ResultChart data={report} dataIndex={0} showLegend={false} />
          </Grid>
          <Grid item xs={6} md={6}>
            <ResultChart data={report} dataIndex={1} showLegend={false} />
          </Grid>
        </Grid>
        <ModifyButton onClick={onModify} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Report);
