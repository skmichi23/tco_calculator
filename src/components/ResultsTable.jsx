import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ResultChart from "./ResultChart";
import Button from "@material-ui/core/Button";

const styles = theme => ({});

let id = 0;
function createData(name, price1, price2) {
  id += 1;
  return { id, name, price1, price2 };
}

function ResultsTable(props) {
  const { data, onModify } = props;

  const rows = [
    createData(
      "Depreciation of the car",
      data.comparison["depreciation"][0],
      data.comparison["depreciation"][1]
    ),
    createData(
      "Government subsidy",
      data.comparison["subsidy"][0],
      data.comparison["subsidy"][1]
    ),
    createData(
      "Cost of finance",
      data.comparison["finance"][0],
      data.comparison["finance"][1]
    ),
    createData(
      "Fuel cost",
      data.comparison["fuel"][0],
      data.comparison["fuel"][1]
    ),
    createData(
      "Insurance",
      data.comparison["insurance"][0],
      data.comparison["insurance"][1]
    ),
    createData(
      "Servicing and maintanance",
      data.comparison["service"][0],
      data.comparison["service"][1]
    ),

    createData(
      "Total",
      data.comparison["total"][0],
      data.comparison["total"][1]
    ),
    createData(
      "Per km",
      data.comparison["perkm"][0],
      data.comparison["perkm"][1]
    )
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              {/* <Typography variant="subheading">TODO_SELECTED_CAR</Typography> */}
              {/* <img alt="" src="https://placekitten.com/150/100" /> */}
            </TableCell>
            <TableCell>
              {/* <Typography variant="subheading">Voltia Nissan</Typography> */}
              {/* <img alt="" src="https://placekitten.com/150/100" /> */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Operation period
            </TableCell>
            <TableCell numeric>
              <b>{data.operationPeriod} years</b>
            </TableCell>
            <TableCell numeric>
              <b>{data.operationPeriod} years</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Total km driven
            </TableCell>
            <TableCell numeric>
              <b>{data.totalKm} km</b>
            </TableCell>
            <TableCell numeric>
              <b>{data.totalKm} km</b>
            </TableCell>
          </TableRow>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.price1} €</TableCell>
                <TableCell numeric>{row.price2} €</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell component="th" scope="row" />
            <TableCell>
              <center>
                <div style={{ width: 200, height: 200 }}>
                  <ResultChart data={data} dataIndex={0} showLegend={false} />
                </div>
              </center>
            </TableCell>
            <TableCell>
              <center>
                <div style={{ width: 200, height: 200 }}>
                  <ResultChart data={data} dataIndex={1} showLegend={false} />
                </div>
              </center>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <center>
        <Button onClick={onModify}>Modify</Button>
      </center>
    </Paper>
  );
}

export default withStyles(styles)(ResultsTable);
