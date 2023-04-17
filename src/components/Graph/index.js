import React, { useEffect } from "react";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const Wind = (props) => {
  // Add some life
  useEffect(() => {
    const data = props.weather_data;
    let wind_speed = 0;
    if (data && Object.keys(data).length > 0) {
      wind_speed = data.current.wind_speed;
    }

    Highcharts.chart("container-wind", {
      chart: {
        type: "gauge",
        plotBackgroundColor: "",
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: "90%",
        backgroundColor: "",
      },

      title: {
        text: "Wind Speed",
      },

      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ["50%", "70%"],
        size: "120%",
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 40,
        tickPixelInterval: 72,
        tickPosition: "inside",
        tickColor: "#FFFFFF",
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: "14px",
          },
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: "#55BF3B", // green
            thickness: 20,
          },
          {
            from: 10,
            to: 20,
            color: "#DDDF0D", // yellow
            thickness: 20,
          },
          {
            from: 20,
            to: 30,
            color: "#DF5353", // red
            thickness: 20,
          },
          {
            from: 30,
            to: 40,
            color: "#DF5353", // red
            thickness: 20,
          },
        ],
      },

      series: [
        {
          name: "Speed",
          data: [wind_speed],
          tooltip: {
            valueSuffix: " km/h",
          },
          dataLabels: {
            format: "{y} km/h",
            borderWidth: 0,
            color: "white",
            style: {
              fontSize: "16px",
            },
          },
          dial: {
            radius: "80%",
            backgroundColor: "white",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "white",
            radius: 6,
          },
        },
      ],
    });
  }, [props.weather_data]);

  useEffect(() => {
    const data = props.weather_data;
    let humidity = 0;
    let feels_like = 0;
    if (data && Object.keys(data).length > 0) {
      humidity = data.current.humidity;
      feels_like = data.current.feels_like;
    }
    var gaugeOptions = {
      chart: {
        backgroundColor: "",
        type: "solidgauge",
      },

      title: null,

      pane: {
        center: ["50%", "70%"],
        size: "80%",
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: "#EEE",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },

      exporting: {
        enabled: false,
      },

      tooltip: {
        enabled: false,
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, "#DDDF0D"], // green
          [0.5, "#DDDF0D"], // yellow
          [0.9, "#DF5353"], // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
        },
        labels: {
          y: 16,
        },
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
    };

    // The Humidity
    Highcharts.chart(
      "container-speed",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: "Humidity",
          },
        },

        credits: {
          enabled: false,
        },

        series: [
          {
            name: "Humidity",
            data: [humidity],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}%</span><br/>' +
                // '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: " km/h",
            },
          },
        ],
      })
    );

    // The Humidity
    Highcharts.chart(
      "container-rpm",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: "Feels Like",
          },
        },

        credits: {
          enabled: false,
        },

        series: [
          {
            name: "Feels Like",
            data: [parseInt(feels_like)],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}°C</span><br/>' +
                // '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: " km/h",
            },
          },
        ],
      })
    );

    // Feels like
    // Highcharts.chart(
    //   "container-rpm",
    //   Highcharts.merge(gaugeOptions, {
    //     yAxis: {
    //       min: 0,
    //       max: 200,
    //       title: {
    //         text: "Feels Like",
    //       },
    //     },

    //     series: [
    //       {
    //         name: "Feels Like",
    //         data: [feels_like],
    //         dataLabels: {
    //           format:
    //             '<div style="text-align:center">' +
    //             '<span style="font-size:25px">{y:.1f}°C</span><br/>' +
    //             "</div>",
    //         },
    //         tooltip: {
    //           valueSuffix: " revolutions/min",
    //         },
    //       },
    //     ],
    //   })
    // );
  }, []);

  return (
    <div className="graph-section">
      <div class="location-card">
        <figure class="highcharts-figure">
          <div id="container-speed" class="chart-container"></div>
          <div id="container-rpm" class="chart-container"></div>
          <div id="container-wind" class="chart-container"></div>
        </figure>
      </div>
    </div>
  );
};

export default Wind;
