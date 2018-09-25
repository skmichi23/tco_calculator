import React from "react";
import { ResponsivePie } from "@nivo/pie";

function createData(data, index) {
  return [
    {
      id: "Depreciation",
      label: "Depreciation",
      value: data.comparisonPct.depreciation[index],
      color: "hsl(261, 70%, 50%)"
    },
    {
      id: "Gov. subsidy",
      label: "Gov. subsidy",
      value: data.comparisonPct.subsidy[index],
      color: "hsl(313, 70%, 50%)"
    },
    {
      id: "Cost of finance",
      label: "Cost of finance",
      value: data.comparisonPct.finance[index],
      color: "hsl(146, 70%, 50%)"
    },
    {
      id: "Fuel Cost",
      label: "Fuel Cost",
      value: data.comparisonPct.fuel[index],
      color: "hsl(176, 70%, 50%)"
    },
    {
      id: "Service Costs",
      label: "Service Costs",
      value: data.comparisonPct.service[index],
      color: "hsl(143, 70%, 50%)"
    },
    {
      id: "Insurance",
      label: "Insurance",
      value: data.comparisonPct.insurance[index],
      color: "hsl(212, 70%, 50%)"
    }
  ];
}

export default ({ data, dataIndex, showLegend }) => {
  const chartData = createData(data, dataIndex);

  return (
    <div style={{ height: 250, margin: 20 }}>
      <ResponsivePie
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="inherit:darker(0.2)"
        enableSlicesLabels={false}
        enableRadialLabels={true}
        animate={true}
        tooltip={node => node.id + "(" + node.value + " %)"}
        radialLabel={node => node.id + "(" + node.value + " %)"}
        motionStiffness={90}
        motionDamping={15}
        radialLabelsLinkHorizontalLength={5}
      />
    </div>
  );
};
