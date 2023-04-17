import React, { useEffect } from "react";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const Humidity = (props) => {
  // Add some life
  useEffect(() => {
    const data = props.weather_data;
    let humidity = 0;
    if (data && Object.keys(data).length > 0) {
      humidity = data.current.humidity;
    }
    var gaugeOptions = {
      chart: {
        type: "solidgauge",
      },

      title: null,

      pane: {
        center: ["50%", "65%"],
        size: "100%",
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
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
          [0.1, "#55BF3B"], // green
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

    // The speed gauge
    Highcharts.chart(
      "container-speed",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 200,
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
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">%</span>' +
                "</div>",
            },
            tooltip: {
              valueSuffix: " %",
            },
          },
        ],
      })
    );
  }, [props.weather_data]);

  return (
    <div className="humidityGraph">
      <figure class="highcharts-figure">
        <div id="container-speed" class="chart-container"></div>
      </figure>
    </div>
  );
};

export default Humidity;
