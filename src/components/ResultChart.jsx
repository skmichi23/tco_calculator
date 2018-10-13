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

export default ({ data, dataIndex, legendOnly = false, size = "normal" }) => {
  const chartData = createData(data, dataIndex);

  if (legendOnly) {
    return (
      <div style={{ height: 120, marginBottom: 10 }}>
        <ResponsivePie
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
          innerRadius={1}
          padAngle={1}
          cornerRadius={0}
          colors="yellow_green"
          colorBy="id"
          borderWidth={0}
          enableSlicesLabels={false}
          enableRadialLabels={false}
          animate={false}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(183,219,150, 1.0)",
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.5)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: "Depreciation"
              },
              id: "dots"
            }
          ]}
          legends={[
            {
              anchor: "top",
              direction: "column",
              translateY: 0,
              translateX: 0,
              itemWidth: 120,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 18,
              symbolShape: "circle"
            }
          ]}
        />
      </div>
    );
  } else {
    if (size === "small") {
      return (
        <div style={{ height: 200, margin: 0 }}>
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
            colors="yellow_green"
            colorBy="id"
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            enableSlicesLabels={false}
            enableRadialLabels={false}
            animate={false}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(183,219,150, 1.0)",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.5)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: "Depreciation"
                },
                id: "dots"
              }
            ]}
          />
        </div>
      );
    } else {
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
            colors="yellow_green"
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
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(183,219,150, 1.0)",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.5)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: "Depreciation"
                },
                id: "dots"
              }
            ]}
          />
        </div>
      );
    }
  }
};
