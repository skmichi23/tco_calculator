import React from "react";

export default ({ report }) => (
  <React.Fragment>
    <h1>operation period:</h1>
    <span>{report.operationPeriod}</span>
    <h1>total km:</h1>
    <span>{report.totalKm}</span>
  </React.Fragment>
);
