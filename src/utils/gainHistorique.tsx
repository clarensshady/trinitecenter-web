import * as React from "react";
import Chart from "react-apexcharts";

type IType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;

interface IData {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      height: number;
      type: IType;
      zoom: {
        enabled: boolean;
      };
    };
    title: {
      text: string;
      align: any;
    };
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      curve: any;
    };

    xaxis: {
      // type: any;
      categories: string[];
    };
    tooltip: {
      x: {
        format: string;
      };
    };
  };
}

export function GainHistorique() {
  const [data /* setData */] = React.useState<IData>({
    series: [
      {
        name: "Florida",
        data: [31, 40, 28, 51, 42, 100],
      },
      {
        name: "Goergia",
        data: [11, 32, 45, 32, 34, 41],
      },
      {
        name: "New York",
        data: [30, 34, 80, 32, 90, 70],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Statistiques des gains",
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["FM", "FS", "GM", "GS", "NYM", "NYS"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        height={350}
      />
    </div>
  );
}
