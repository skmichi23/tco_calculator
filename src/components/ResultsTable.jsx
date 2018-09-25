import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#72b33c",
    color: theme.palette.common.white,
    fontSize: 20
  },
  body: {
    fontSize: 18
  }
}))(TableCell);

const styles = theme => ({
  imgCol: { width: "32%" },
  imgColInvisi: { width: "35%" },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    fontFamily: "Roboto"
  },
  table: {
    minWidth: 700,
    tableLayout: "fixed"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  fillerCol: {
    width: "10%",
    padding: 0,
    margin: 0
  },
  dataCol: {
    textAlign: "right",
    padding: 0,
    margin: 0,
    width: "15%"
  },
  headerCol: {
    width: "35%",
    paddingRight: 20
  },
  perKmBorder: {
    position: "relative",
    left: 15,
    padding: "5px 15px",
    border: "5px solid #7FB14F",
    borderRadius: 10,
    fontWeight: 500
  },
  imgTable: {
    width: "100%"
  },
  imgPaper: {
    textAlign: "center",
    marginLeft: 10
  }
});

let id = 0;
function createData(name, price1, price2) {
  id += 1;
  return { id, name, price1, price2 };
}

function ResultsTable(props) {
  const { data, onModify, classes } = props;

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
    )
  ];

  const priceRow = createData(
    "Total",
    data.comparison["total"][0],
    data.comparison["total"][1]
  );

  const perKm = createData(
    "Price per km",
    data.comparison["perkm"][0],
    data.comparison["perkm"][1]
  );

  console.log(data);

  return (
    <React.Fragment>
      <table className={classes.imgTable}>
        <tr>
          <td className={classes.imgColInvisi} />
          <td className={classes.imgCol}>
            <Paper className={classes.imgPaper}>
              <img src={"./images/cars/" + data.car + ".jpg"} />
            </Paper>
          </td>
          <td className={classes.imgCol}>
            <Paper className={classes.imgPaper}>
              <img src="./images/cars/voltia.jpg" />
            </Paper>
          </td>
        </tr>
      </table>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell className={classes.headerCol}>
                Cars comparison
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                {data.car}
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                Voltia
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell
                    component="th"
                    scope="row"
                    className={classes.headerCol}
                  >
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell className={classes.fillerCol} />
                  <CustomTableCell className={classes.dataCol}>
                    <NumberFormat
                      value={row.price1}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix={" €"}
                      decimalSeparator={","}
                    />
                  </CustomTableCell>
                  <CustomTableCell className={classes.fillerCol} />
                  <CustomTableCell className={classes.fillerCol} />
                  <CustomTableCell className={classes.dataCol}>
                    <NumberFormat
                      value={row.price2}
                      displayType={"text"}
                      thousandSeparator={" "}
                      suffix={" €"}
                      decimalSeparator={","}
                    />
                  </CustomTableCell>
                  <CustomTableCell className={classes.fillerCol} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow className={classes.row}>
              <CustomTableCell
                component="th"
                scope="row"
                className={classes.headerCol}
              >
                <span style={{ fontWeight: 500 }}>{priceRow.name}</span>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                <span style={{ fontWeight: 500 }}>
                  <NumberFormat
                    value={priceRow.price1}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix={" €"}
                    decimalSeparator={","}
                  />
                </span>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                <span style={{ fontWeight: 500 }}>
                  <NumberFormat
                    value={priceRow.price2}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix={" €"}
                    decimalSeparator={","}
                  />
                </span>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow className={classes.row}>
              <CustomTableCell
                component="th"
                scope="row"
                className={classes.headerCol}
              >
                <span style={{ fontWeight: 500 }}>{perKm.name}</span>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                <p className={classes.perKmBorder}>
                  <NumberFormat
                    value={perKm.price1}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix={" €"}
                    decimalSeparator={","}
                  />
                </p>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.fillerCol} />
              <CustomTableCell className={classes.dataCol}>
                <p className={classes.perKmBorder}>
                  <NumberFormat
                    value={perKm.price2}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix={" €"}
                    decimalSeparator={","}
                  />
                </p>
              </CustomTableCell>
              <CustomTableCell className={classes.fillerCol} />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(ResultsTable);
