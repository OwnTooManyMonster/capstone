// DOM Elements and Event Listener

import * as main from "./main.js";
//  MAPBOX
mapboxgl.accessToken =
  "pk.eyJ1Ijoib3dudG9vbWFueW1vbnN0ZXIiLCJhIjoiY2tvNzMwMGpuMjk4ZDJvbXZqaHBqanlpbSJ9.DHukChuKakMnzj-mieZ1Og";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/owntoomanymonster/ckot57v681bag17nval9396yq", // style URL
  center: [-1.81361, 36.77271], // starting position [lng, lat]
  zoom: -0.5, // starting zoom
});

let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-151.518, 66.917],
      },
      properties: {
        title: "Station",
        description: "Bettles Airport ,Alaska",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [11.933, 78.923],
      },
      properties: {
        title: "Station",
        description: "Spitzbergen , Norway",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-157.929, 21.324],
      },
      properties: {
        title: "Station",
        description: "Hawaii , USA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.403, 52.468],
      },
      properties: {
        title: "Station",
        description: "Berlin, Germany",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-16.255, 28.463],
      },
      properties: {
        title: "Station",
        description: "Tenerife, Spain",
      },
    },
  ],
};
//add markers to map
geojson.features.forEach(function (marker) {
  // create a HTML element for each feature
  var el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 20 }) // add popups
        .setHTML(
          "<h3>" +
            marker.properties.title +
            "</h3><h4>" +
            marker.properties.description +
            "</h4>"
        )
    )
    .addTo(map);
});

//  API FETCH

//  5 times fetch since differnt mandatory Year Selection (10 years max by NOAA Server)

let oneOfFive =
  "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&units=METRIC&startdate=1975-01-01&enddate=1984-12-31&datatypeid=TAVG&limit=1000&sortfield=station&stationid=GHCND:NOE00134778&stationid=GHCND:USW00026533&stationid=GHCND:USW00022521&stationid=GHCND:USW00012836&stationid=GHCND:SPE00120458&stationid=GHCND:GME00111445";

let twoOfFive =
  "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&units=METRIC&startdate=1985-01-01&enddate=1994-12-31&datatypeid=TAVG&limit=1000&sortfield=station&stationid=GHCND:NOE00134778&stationid=GHCND:USW00026533&stationid=GHCND:USW00022521&stationid=GHCND:USW00012836&stationid=GHCND:SPE00120458&stationid=GHCND:GME00111445";

let threeOfFive =
  "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&units=METRIC&startdate=1995-01-01&enddate=2004-12-31&datatypeid=TAVG&limit=1000&sortfield=station&stationid=GHCND:NOE00134778&stationid=GHCND:USW00026533&stationid=GHCND:USW00022521&stationid=GHCND:USW00012836&stationid=GHCND:SPE00120458&stationid=GHCND:GME00111445";

let fourOfFive =
  "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&units=METRIC&startdate=2005-01-01&enddate=2014-12-31&datatypeid=TAVG&limit=1000&sortfield=station&stationid=GHCND:NOE00134778&stationid=GHCND:USW00026533&stationid=GHCND:USW00022521&stationid=GHCND:USW00012836&stationid=GHCND:SPE00120458&stationid=GHCND:GME00111445";

let fiveOfFive =
  "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&units=METRIC&startdate=2015-01-01&enddate=2020-12-31&datatypeid=TAVG&limit=1000&sortfield=station&stationid=GHCND:NOE00134778&stationid=GHCND:USW00026533&stationid=GHCND:USW00022521&stationid=GHCND:USW00012836&stationid=GHCND:SPE00120458&stationid=GHCND:GME00111445";

let fetchArray = [oneOfFive, twoOfFive, threeOfFive, fourOfFive, fiveOfFive];

const token = "WVEwvCMCqAKfcjKwwjLJonCdawPQuVeE";
// MASTERFETCH FUNCTION CALLS ARRAYFETCH FUNCTION FOR (FETCHARRAY ARRAY)

// ARRAY FETCH FUNCTION CALLED IN MASTERFETCH FUNCTION

function arrayFetch(element) {
  return fetch(element, {
    method: "GET",
    headers: { token: token },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Successful");

        return response;
      } else {
        console.log(response.status);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      let WeatherArray;
      WeatherArray = JSON.parse(localStorage.getItem("WeatherData"));
      if (WeatherArray === null) {
        WeatherArray = [];
        WeatherArray.push(data);
      } else {
        WeatherArray.push(data);
      }
      localStorage.setItem("WeatherData", JSON.stringify(WeatherArray));
    });
}

// Promise All after all Fetsches resoved calls dataFormat Function to
const fetchingURL = fetchArray.map((url) => fetch(url).then());
// setTimeout(function () {
// Promise.all(fetchingURL).then(dataFormat);

// localStorage.removeItem("WeatherData");

// MASTERFETCH FUNCTION CALLS ARRAYFETCH FUNCTION FOR (FETCHARRAY ARRAY)
function masterFetch() {
  fetchArray.forEach((element) => arrayFetch(element));
}
//masterFetch();

//   DATA CONVERSION FOR CHART.JS

let WeatherArray = JSON.parse(localStorage.getItem("WeatherData"));

let ArrayOne = WeatherArray[0]["results"];
let ArrayTwo = WeatherArray[1]["results"];
let ArrayThree = WeatherArray[2]["results"];
let ArrayFour = WeatherArray[3]["results"];
let ArrayFive = WeatherArray[4]["results"];

let MainArray = ArrayOne.concat(ArrayTwo)
  .concat(ArrayThree)
  .concat(ArrayFour)
  .concat(ArrayFive);

let NOE00134778 = MainArray.filter(
  ({ station }) => station === "GHCND:NOE00134778"
);
let GME00111445 = MainArray.filter(
  ({ station }) => station === "GHCND:GME00111445"
);
let SPE00120458 = MainArray.filter(
  ({ station }) => station === "GHCND:SPE00120458"
);
let USW00012836 = MainArray.filter(
  ({ station }) => station === "GHCND:USW00012836"
);
let USW00022521 = MainArray.filter(
  ({ station }) => station === "GHCND:USW00022521"
);
let USW00026533 = MainArray.filter(
  ({ station }) => station === "GHCND:USW00026533"
);

let stationArray = [
  NOE00134778,
  GME00111445,
  SPE00120458,
  USW00012836,
  USW00022521,
  USW00026533,
];

for (let i = 0; i < stationArray.length; i++) {
  for (let j = 0; j < stationArray[i].length; j++) {
    let value = stationArray[i][j]["date"];

    value = value.slice(0, 4);

    value = Number(value);

    stationArray[i][j]["date"] = value;
  }
  stationArray[i].sort(function (a, b) {
    return a.date - b.date;
  });
}

let NOE00134778date = [];
let NOE00134778value = [];

let GME00111445date = [];
let GME00111445value = [];

let SPE00120458date = [];
let SPE00120458value = [];

let USW00012836date = [];
let USW00012836value = [];

let USW00022521date = [];
let USW00022521value = [];

let USW00026533date = [];
let USW00026533value = [];

for (let i = 0; i < NOE00134778.length; i++) {
  NOE00134778date[i] = NOE00134778[i]["date"];
  NOE00134778value[i] = NOE00134778[i]["value"];
}

for (let i = 0; i < GME00111445.length; i++) {
  GME00111445date[i] = GME00111445[i]["date"];
  GME00111445value[i] = GME00111445[i]["value"];
}

for (let i = 0; i < SPE00120458.length; i++) {
  SPE00120458date[i] = SPE00120458[i]["date"];
  SPE00120458value[i] = SPE00120458[i]["value"];
}

for (let i = 0; i < USW00012836.length; i++) {
  USW00012836date[i] = USW00012836[i]["date"];
  USW00012836value[i] = USW00012836[i]["value"];
}

for (let i = 0; i < USW00022521.length; i++) {
  USW00022521date[i] = USW00022521[i]["date"];
  USW00022521value[i] = USW00022521[i]["value"];
}

for (let i = 0; i < USW00026533.length; i++) {
  USW00026533date[i] = USW00026533[i]["date"];
  USW00026533value[i] = USW00026533[i]["value"];
}
let valueArray = [
  USW00026533value,
  NOE00134778value,
  USW00022521value,
  GME00111445value,
  SPE00120458value,
];
let labelArray = ["Alaska", "Spitzbergen", "Hawaii", "Berlin", "Teneriffe"];
let controlYears = [
  1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
  1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020,
]; //   if element controlyears found in array create element in new array else create element controlyear as element in new array with the data of the element controlyear before
//  Chart.JS

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  options: {},
  data: {
    labels: controlYears,
    datasets: [
      {
        label: "Spitzbergen",
        data: [0],
        Size: [30],
        borderColor: ["rgba(255, 131, 0, 0.5)"],
        backgroundColor: ["rgba(255, 131, 0, 0.5)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

let mapStations = document.querySelectorAll(".mapboxgl-marker");
let canvasChart = document.getElementById("myChart");

for (let i = 0; i < mapStations.length; i++) {
  mapStations[i].addEventListener("click", () => {
    myChart.reset();
    myChart.data.datasets[0].data = valueArray[i];
    myChart.data.datasets[0].label = labelArray[i];
    myChart.update();
  });
}

// let stationsArray = document.querySelectorAll(".mapboxgl-marker");

// for (let i = 0; i < stationsArray.length; i++) {
//   stationsArray[i].addEventListener("click", () => {
//     dataset = datasetObjects[i];
//   });
// }
