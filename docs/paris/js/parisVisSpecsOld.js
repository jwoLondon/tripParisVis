// DATA SOURCES

let path = "https://jwolondon.github.io/mobv/data/paris/";

let bicycleStationData = path + "StationLocations.csv";
let bicycleTimeSeriesData = path + "StationDailyTimeSeries.csv";
let bicycleReferenceData = path + "StationReference_2.csv";



let annotationsData = path + "annotations.csv";

let blueLines = path + "geo/parisRiver.json";
let blueLineFeature = "zurichLines";
let bluePolys = path + "geo/parisLakes.json";
let bluePolyFeature = "zurichPolys";
let greenPolys = path + "geo/parisGreen.json";
let greenPolyFeature = "zurichPolys";

// CHART SCALING

let bicycleAnomalyMax = 90;
let bicycleAnomalyMin = -90;


// -----------------------------------------------------------------------------

// BICYCLE LINKED VIEWS CHART

let vlSpecLinkedBicycle = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  spacing: 0,
  padding: {
    left: 10,
    top: 0,
    right: 0,
    bottom: 0,
  },
  data: { url: `${bicycleTimeSeriesData}` },
  transform: [
    {
      lookup: "id",
      from: {
        data: { url: `${bicycleReferenceData}` },
        key: "id",
        fields: ["value"],
      },
    },
    {
      calculate:
        "datum.value == 0 ? 0 : (datum.count - datum.value)/sqrt(datum.value)",
      as: "anomaly",
    },
    {
      lookup: "station",
      from: {
        data: { url: `${bicycleStationData}` },
        key: "station_id",
        fields: ["station_name"],
      },
    },
    {
      filter: "datum.station_name != null",
    },
  ],
  hconcat: [
    {
      vconcat: [
        {
          width: 600,
          height: {
            step: 8,
          },
          layer: [
            {
              selection: {
                brush: {
                  type: "multi",
                  fields: ["station_name"],
                },
              },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                  axis: {
                    gridOpacity: {
                      condition: {
                        test: "day(datum.value) == 6 || day(datum.value) == 0",
                        value: 1,
                      },
                      value: 0,
                    },
                    tickSize: {
                      condition: {
                        test: "day(datum.value) == 1",
                        value: 6,
                      },
                      value: 3,
                    },
                    tickCount: 200,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                    labelFont: "Roboto Condensed",
                  },
                },
                y: {
                  field: "station_name",
                  type: "nominal",
                  sort: {
                    field: "count",
                    op: "mean",
                    order: "descending",
                  },
                  axis: {
                    title: "",
                    offset: 7,
                    domain: false,
                    ticks: false,
                    labelFont: "Roboto Condensed",
                  },
                },
                color: {
                  field: "anomaly",
                  type: "quantitative",
                  scale: {
                    scheme: "blueOrange",
                    domainMid: 0,
                  },
                  legend: {
                    title: "Anomaly",
                    direction: "horizontal",
                    orient: "top",
                    gradientThickness: 8,
                  },
                },
                opacity: {
                  condition: {
                    selection: "brush",
                    value: 1,
                  },
                  value: 0.5,
                },
                size: {
                  condition: {
                    selection: "brush",
                    value: 90,
                  },
                  value: 40,
                },
                tooltip: [
                  {
                    field: "station_name",
                    type: "nominal",
                    title: "locality",
                  },
                  {
                    field: "date",
                    type: "temporal",
                    format: "%a %e %b",
                  },
                  {
                    field: "value",
                    type: "quantitative",
                    title: "expected",
                    format: ".0f",
                  },
                  {
                    field: "count",
                    type: "quantitative",
                    title: "observed",
                    format: ".0f",
                  },
                  {
                    field: "anomaly",
                    type: "quantitative",
                    format: ".1f",
                  },
                ],
              },
              mark: "square",
            },
            {
              data: { url: `${annotationsData}` },
              layer: [
                {
                  encoding: {
                    x: {
                      field: "date",
                      type: "temporal",
                    },
                  },
                  mark: {
                    type: "rule",
                    strokeDash: [4, 2],
                    opacity: 0.5,
                  },
                },
                {
                  encoding: {
                    x: {
                      field: "date",
                      type: "temporal",
                    },
                    y: {
                      value: 0,
                    },
                    text: {
                      field: "notes",
                      type: "nominal",
                    },
                  },
                  mark: {
                    type: "text",
                    angle: 310,
                    align: "left",
                    opacity: 0.5,
                    fontSize: 8,
                    font: "Roboto Condensed",
                    dx: 2,
                  },
                },
              ],
            },
          ],
        },
        {
          width: 600,
          height: 400,
          layer: [
            {
              selection: {
                brush: {
                  type: "multi",
                  fields: ["station_name"],
                },
              },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                  axis: {
                    gridOpacity: {
                      condition: {
                        test: "day(datum.value) == 6 || day(datum.value) == 0",
                        value: 1,
                      },
                      value: 0,
                    },
                    tickSize: {
                      condition: {
                        test: "day(datum.value) == 1",
                        value: 6,
                      },
                      value: 3,
                    },
                    tickCount: 200,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                    labelFont: "Roboto Condensed",
                  },
                },
                y: {
                  field: "anomaly",
                  type: "quantitative",
                  scale: {
                    domain: [`${bicycleAnomalyMin}`, `${bicycleAnomalyMax}`],
                    nice: false,
                  },
                  title: "Anomaly",
                  labelFont: "Roboto Condensed",
                },
                color: {
                  condition: {
                    selection: "brush",
                    field: "station_name",
                    type: "nominal",
                    legend: null,
                  },
                  value: "black",
                },
                opacity: {
                  condition: {
                    selection: "brush",
                    value: 1,
                  },
                  value: 0.1,
                },
                size: {
                  condition: {
                    selection: "brush",
                    value: 2,
                  },
                  value: 0.2,
                },
              },
              mark: {
                type: "line",
                interpolate: "monotone",
                clip: true,
              },
            },
            {
              data: {
                values: [
                  {
                    origin: 0,
                  },
                ],
              },
              encoding: {
                y: {
                  field: "origin",
                  type: "quantitative",
                },
              },
              mark: "rule",
            },
            {
              data: { url: `${annotationsData}` },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                },
              },
              mark: {
                type: "rule",
                strokeDash: [4, 2],
                opacity: 0.5,
              },
            },
          ],
        },
      ],
    },
    {
      width: 600,
      height: 600,
      transform: [
        {
          aggregate: [
            {
              op: "count",
              field: "station_name",
              as: "numReadings",
            },
          ],
          groupby: ["station_name"],
        },
        {
          lookup: "station_name",
          from: {
            data: { url: `${bicycleStationData}` },
            key: "station_name",
            fields: ["lon", "lat"],
          },
        },
      ],
      layer: [
        {
          layer: [
            {
              data: {
                url: `${greenPolys}`,
                format: {
                  type: "topojson",
                  feature: `${greenPolyFeature}`,
                },
              },
              mark: {
                type: "geoshape",
                color: "rgb(239,244,225)",
              },
            },
            {
              data: {
                url: `${blueLines}`,
                format: { type: "topojson", feature: `${blueLineFeature}` },
              },

              mark: {
                type: "geoshape",
                color: "rgb(226,237,246)",
                strokeWidth: 4,
                filled: false,
              },
            },
            {
              data: {
                url: `${bluePolys}`,
                format: { type: "topojson", feature: `${bluePolyFeature}` },
              },
              mark: {
                type: "geoshape",
                color: "rgb(226,237,246)",
              },
            },
          ],
        },
        {
          selection: {
            brush: {
              type: "multi",
              fields: ["station_name"],
            },
          },
          encoding: {
            longitude: {
              field: "lon",
              type: "quantitative",
            },
            latitude: {
              field: "lat",
              type: "quantitative",
            },
            color: {
              field: "station_name",
              type: "nominal",
              legend: null,
            },
            opacity: {
              condition: {
                selection: "brush",
                value: 1,
              },
              value: 0.1,
            },
          },
          mark: {
            type: "square",
            size: 80,
          },
        },
        {
          encoding: {
            longitude: {
              field: "lon",
              type: "quantitative",
            },
            latitude: {
              field: "lat",
              type: "quantitative",
            },
            text: {
              field: "station_name",
              type: "nominal",
            },
            opacity: {
              condition: {
                selection: "brush",
                value: 1,
              },
              value: 0.1,
            },
          },
          mark: {
            type: "text",
            dy: 10,
            fontSize: 6,
            font: "Roboto Condensed",
          },
        },
      ],
    },
  ],
};


// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#visLinkedBicycle", vlSpecLinkedBicycle).catch(console.error);
