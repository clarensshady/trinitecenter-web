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
    plotOptions: {
      bar: {
        borderRadius: number;
        dataLabels: {
          position: string;
        };
      };
    };
    title: {
      text: string;
      align: any;
      floating: boolean;
      offsetY: number;
      style: {
        color: string;
      };
    };
    dataLabels: {
      enabled: boolean;
      formatter: (val: any) => string;
      offsetY: number;
      style: {
        fontSize: string;
        colors: string[];
      };
    };
    /* stroke: {
      curve: any;
    }; */

    xaxis: {
      // type: any;
      categories: string[];
      position: any;
      axisBorder: {
        show: boolean;
      };
      axisTicks: {
        show: boolean;
      };
      crosshairs: {
        fill: {
          type: string;
          gradient: {
            colorFrom: string;
            colorTo: string;
            stops: number[];
            opacityFrom: number;
            opacityTo: number;
          };
        };
      };
      tooltip: {
        enabled: boolean;
      };
    };
    yaxis: {
      axisBorder: {
        show: boolean;
      };
      axisTicks: {
        show: boolean;
      };
      labels: {
        show: boolean;
        formatter: (val: any) => string;
      };
    };
  };
}

export function RapportHistoriques() {
  const [data, setData] = React.useState<IData>({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Rapport Total: 1,400,350Gds",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
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
