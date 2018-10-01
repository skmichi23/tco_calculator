import React from "react";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  select: {
    minWidth: 300,
    maxWidth: 500,
    margin: 20
  },
  paper: {
    width: 320,
    padding: 5,
    margin: 5,
    textAlign: "center"
  },
  grid: {
    padding: 10
  }
};

function SelectWithImage({ classes, value, onAnswer, question }) {
  return (
    <table cellPadding={0} cellSpacing={0} className="question">
      <thead>
        <tr>
          <th colSpan="2">{question.text}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Grid
              className={classes.grid}
              container
              justify="space-between"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                <Select
                  onChange={onAnswer}
                  className={classes.select}
                  value={value}
                >
                  {question.config.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <img
                    alt=""
                    className="select-image"
                    src={
                      process.env.REACT_APP_IMG_PATH + "/cars/" + value + ".jpg"
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default withStyles(styles)(SelectWithImage);
