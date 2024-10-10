import * as React from "react";
import Chart from "react-apexcharts";

export interface IAppProps {}

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
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      width: number[];
      curve: any;
      dashArray: number[];
    };
    title: {
      text: string;
      align: any;
    };
    legend: {
      tooltipHoverFormatter: (val: string, opts: any) => string;
    };
    markers: {
      size: number;
      hover: {
        sizeOffset: number;
      };
    };
    xaxis: {
      categories: string[];
    };
    tooltip: {
      y: ApexTooltipY | ApexTooltipY[] | undefined;
    };
    grid: {
      borderColor: string;
    };
  };
}

export function TirageChart() {
  const [data, setData] = React.useState<IData>({
    series: [
      {
        name: "Florida",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
      },
      {
        name: "Georgia",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
      {
        name: "New York",
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "Statistiques des Fiches",
        align: "left",
      },
      legend: {
        tooltipHoverFormatter: function (val: string, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: string) {
                return val + " (mins)";
              },
            },
          },
          {
            title: {
              formatter: function (val: string) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val: string) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </div>
  );
}
