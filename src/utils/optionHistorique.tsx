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
      /* zoom: {
        enabled: boolean;
      }; */
    };
    /* title: {
      text: string;
      
    }; */
    yaxis: {
      stepSize: number;
    };
    xaxis: {
      categories: string[];
    };
  };
}

export function OptionHistorique() {
  const [data /* setData */] = React.useState<IData>({
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      /* title: {
        text: "Basic Radar Chart",
      }, */
      yaxis: {
        stepSize: 20,
      },
      xaxis: {
        categories: [
          "Borlette",
          "Lotto3",
          "Lotto4",
          "Lotto5",
          "Lotto6",
          "Mariage",
        ],
      },
    },
  });

  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type="radar"
        height={350}
      />
    </div>
  );
}
