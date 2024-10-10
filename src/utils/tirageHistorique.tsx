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
    dataLabels: {
      enabled: boolean;
    };
    forecastDataPoints: {
      count: number;
    };
    stroke: {
      width: number;
      curve: any;
    };
    title: {
      text: string;
      align: any;
      style: {
        fontSize: string;
        color: string;
      };
    };
    fill: {
      type: string;
      gradient: {
        shade: string;
        gradientToColors: string[];
        shadeIntensity: number;
        type: string;
        opacityFrom: number;
        opacityTo: number;
        stops: number[];
      };
    };
    xaxis: {
      // type: any;
      categories: string[];
      tickAmount: any;
    };
  };
}

export function TirageHistorique() {
  const [data, setData] = React.useState<IData>({
    series: [
      {
        name: "Montant",
        data: [4, 3, 10, 9, 29, 19, 40, 55, 60, 88, 40, 90],
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
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        // type: "datetime",
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
        tickAmount: 10,
      },
      title: {
        text: "Statistiques des tirages",
        align: "left",
        style: {
          fontSize: "15px",
          color: "#666",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
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
