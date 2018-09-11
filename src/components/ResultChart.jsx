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

  let legends = [];
  if (showLegend) {
    legends = [
      {
        anchor: "left",
        direction: "column",
        translateY: 0,
        translateX: "-100",
        itemWidth: 100,
        itemHeight: 30,
        itemTextColor: "#999",
        symbolSize: 18,
        symbolShape: "circle"
      }
    ];
  }

  return (
    <ResponsivePie
      data={chartData}
      margin={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}
      innerRadius={0.0}
      padAngle={0.7}
      cornerRadius={3}
      colors="nivo"
      colorBy="id"
      borderWidth={1}
      borderColor="inherit:darker(0.2)"
      enableRadialLabels={false}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      sliceLabel={node => node.value + " %"}
      motionStiffness={90}
      motionDamping={15}
      legends={legends}
    />
  );
};
