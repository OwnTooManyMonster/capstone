// DOM Elements and Event Listener

import * as main from "./main.js";
//  MAPBOX
mapboxgl.accessToken =
  "pk.eyJ1Ijoib3dudG9vbWFueW1vbnN0ZXIiLCJhIjoiY2tvNzMwMGpuMjk4ZDJvbXZqaHBqanlpbSJ9.DHukChuKakMnzj-mieZ1Og";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/owntoomanymonster/ckorbgpvm41v417o8c5n3savc", // style URL
  center: [-10, 0], // starting position [lng, lat]
  pitch: 30,
  bearing: 0.5,
  zoom: -0.2, // starting zoom
});

//Coordinates and Infos for Mapbox Marker

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
        description: "Bettles Airport, Alaska",
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
        description: "Spitzbergen, Norway",
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
        description: "Hawaii, USA",
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

//  Fetch Url for NOAA Data access  5 seperate fetches necesssary duo to server restricion (max 10 years)

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

let fetchArrays = [oneOfFive, twoOfFive, threeOfFive, fourOfFive, fiveOfFive];

const token = "WVEwvCMCqAKfcjKwwjLJonCdawPQuVeE";
// MASTERFETCH FUNCTION CALLS ARRAYFETCH FUNCTION FOR (FETCHARRAY ARRAY)

// ARRAY FETCH FUNCTION CALLED IN MainFetch FUNCTION

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
const fetchingURL = fetchArrays.map((url) => fetch(url).then());
// setTimeout(function () {
// Promise.all(fetchingURL).then(dataFormat);

// localStorage.removeItem("WeatherData");

// MainFetch FUNCTION CALLS ARRAYFETCH FUNCTION FOR (FETCHARRAY ARRAY)
function mainFetch() {
  fetchArrays.forEach((element) => arrayFetch(element));
}
//mainFetch();

//   DATA CONVERSION FOR CHART.JS

let WeatherArray = JSON.parse(localStorage.getItem("WeatherData"));
// object destructuring for relevant value in result array
let ArrayOne = WeatherArray[0]["results"];
let ArrayTwo = WeatherArray[1]["results"];
let ArrayThree = WeatherArray[2]["results"];
let ArrayFour = WeatherArray[3]["results"];
let ArrayFive = WeatherArray[4]["results"];

// creating one object array with all values for formating
let MainArray = ArrayOne.concat(ArrayTwo)
  .concat(ArrayThree)
  .concat(ArrayFour)
  .concat(ArrayFive);

//object destructuring for local station data

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

// creating array for data type change and sort for chronological years
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
// object destructuring for data visualisation

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
let labelArray = [
  "Alaska, Bettles Air ",
  "Norway, Spitzbergen",
  "Pacific US, Hawaii",
  "Germany, Berlin",
  "Spain, Teneriffe",
];

let controlYears = [
  1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
  1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
  2014, 2015, 2016, 2017, 2018, 2019, 2020,
]; //   if element controlyears found in array create element in new array else create element controlyear as element in new array with the data of the element controlyear before
//  Chart.JS

let historicData = [
  { year: 1900, level: 0 },
  { year: 1920, level: 0.35 },
  { year: 1940, level: 0.5 },
  { year: 1960, level: 0.95 },
  { year: 1980, level: 1.1 },
  { year: 2000, level: 1.45 },
  { year: 2020, level: 2.1 },
];
let arrayYear = [];
let arrayLevel = [];
for (let i = 0; i < historicData.length; i++) {
  arrayYear[i] = historicData[i]["year"];
  arrayLevel[i] = historicData[i]["level"];
}

let predictionData = [
  { year: 2020, interLow: 0, interhigh: 0, extreme: 0 },
  { year: 2050, interLow: 0.25, interhigh: 0.6, extreme: 1.0 },
  { year: 2075, interLow: 0.35, interhigh: 1.0, extreme: 1.5 },
  { year: 2100, interLow: 0.5, interhigh: 1.5, extreme: 2.5 },
];

let predictionYear = [];
let predictionLevelLow = [];
let predictionLevelHigh = [];
let predictionLevelExtreme = [];

for (let i = 0; i < predictionData.length; i++) {
  predictionYear[i] = predictionData[i]["year"];
  predictionLevelLow[i] = predictionData[i]["interLow"];
  predictionLevelHigh[i] = predictionData[i]["interhigh"];
  predictionLevelExtreme[i] = predictionData[i]["extreme"];
}
let predictionArray = [
  predictionLevelLow,
  predictionLevelHigh,
  predictionLevelExtreme,
];

// Begin Chart.js deafult setup
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: controlYears,
    datasets: [
      {
        label: "Weather Station",

        data: null,
        pointStyle: "rectRot",
        pointRadius: 4,
        borderColor: ["rgba(255, 135, 0, 0.5)"],
        backgroundColor: ["rgba(255, 135, 0, 0.3)"],
        borderWidth: 2,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
          },
          color: "rgba(200,200,200,0.8)",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "white",
          borderColor: "transparent",
          tickColor: "transparent",
        },
        ticks: {
          color: "rgba(200,200,200,0.8)",
        },

        title: {
          color: "white",
          display: false,
          text: "Year",
        },
        beginAtZero: false,
      },
      y: {
        max: null,
        ticks: {
          color: "rgba(200,200,200,0.8)",
        },
        grid: {
          display: false,
          color: "transparent",
          borderColor: "transparent",
          tickColor: "transparent",
        },
        title: {
          color: "grey",
          display: true,
          text: " °C ",
        },
        beginAtZero: false,
      },
    },
  },
});

// Eventlistener for local stations trigger related datavisualisation in Chart.js Canvas

let mapStations = document.querySelectorAll(".mapboxgl-marker");

for (let i = 0; i < mapStations.length; i++) {
  mapStations[i].addEventListener("click", () => {
    myChart.data.datasets[0].data = valueArray[i];
    myChart.data.datasets[0].label = labelArray[i];
    myChart.update("active");
  });
}
// EventListener for Button in Chart.js Canvas changes between line and bar charts
let chartToggle = document.querySelector(".chartToggle");
let toggleIcon = document.querySelector(".lni-bar-chart");
chartToggle.addEventListener("click", () => {
  if (myChart.config.type === "bar") {
    myChart.config.type = "line";
    myChart.update();
    toggleIcon.className = "lni lni-bar-chart";
  } else {
    myChart.config.type = "bar";
    myChart.update();
    toggleIcon.className = "lni lni-stats-up";
  }
});

// Event listener for Tiles shift tiles in viewport and triggers changes in chart.js

let tile3on = document.querySelector(".tile3on");
let chartTile2on = document.querySelector(".chartTile2on");
let tile4on = document.querySelector(".tile4on");
let mapTileoff = document.querySelector(".mapTileoff");
let backgroundVideo = document.querySelector(".backgroundVideo");
let chartTileoff = document.querySelector(".chartTileoff");
let chartTileThreeOff = document.querySelector(".chartTileThreeOff");
let backButtonOff = document.querySelector(".backButtonOff");

tile3on.addEventListener("click", () => {
  backgroundVideo.classList.toggle("backgroundVideo");
  backgroundVideo.classList.toggle("backgroundVideo2");
  tile3on.classList.toggle("tile3on");
  tile3on.classList.toggle("tile3off");
  chartTile2on.classList.toggle("chartTile2on");
  chartTile2on.classList.toggle("chartTile2off");
  tile4on.classList.toggle("tile4on");
  tile4on.classList.toggle("tile4off");
  mapTileoff.classList.toggle("mapTileoff");
  mapTileoff.classList.toggle("mapTileon");
  chartTileoff.classList.toggle("chartTileoff");
  chartTileoff.classList.toggle("chartTileon");
  backButtonOff.classList.toggle("backButtonOff");
  backButtonOff.classList.toggle("backButtonOn");
  myChart.data.datasets[0].label = "Station";
  myChart.data.datasets[0].data = 0;
  myChart.config.data.labels = controlYears;
  myChart.config.options.scales.y.title.text = "°C";
  myChart.config.options.scales.y.max = null;
  myChart.update("active");
});

tile4on.addEventListener("click", () => {
  backgroundVideo.classList.toggle("backgroundVideo");
  backgroundVideo.classList.toggle("backgroundVideo2");
  tile3on.classList.toggle("tile3on");
  tile3on.classList.toggle("tile3off");
  chartTile2on.classList.toggle("chartTile2on");
  chartTile2on.classList.toggle("chartTile2off");
  tile4on.classList.toggle("tile4on");
  tile4on.classList.toggle("tile4off");
  chartTileThreeOff.classList.toggle("chartTileThreeOff");
  chartTileThreeOff.classList.toggle("chartTileThreeOn");
  chartTileoff.classList.toggle("chartTileoff");
  chartTileoff.classList.toggle("chartTileon");
  backButtonOff.classList.toggle("backButtonOff");
  backButtonOff.classList.toggle("backButtonOn");
  myChart.data.datasets[0].label = "Historic global sealevel";
  myChart.data.datasets[0].data = arrayLevel;
  myChart.config.data.labels = arrayYear;
  myChart.config.options.scales.y.title.text = "m";
  myChart.config.options.scales.y.max = 2.5;
  myChart.config.type = "line";
  myChart.update("active");
});

backButtonOff.addEventListener("click", () => {
  if (chartTileThreeOff.className === "chartTileThreeOn") {
    chartTileThreeOff.classList.toggle("chartTileThreeOff");
    chartTileThreeOff.classList.toggle("chartTileThreeOn");
    chartTile2on.classList.toggle("chartTile2on");
    chartTile2on.classList.toggle("chartTile2off");
    chartTileoff.classList.toggle("chartTileoff");
    chartTileoff.classList.toggle("chartTileon");
    backButtonOff.classList.toggle("backButtonOff");
    backButtonOff.classList.toggle("backButtonOn");
    tile3on.classList.toggle("tile3on");
    tile3on.classList.toggle("tile3off");
    tile4on.classList.toggle("tile4on");
    tile4on.classList.toggle("tile4off");
    backgroundVideo.classList.toggle("backgroundVideo");
    backgroundVideo.classList.toggle("backgroundVideo2");
  } else {
    tile3on.classList.toggle("tile3on");
    tile3on.classList.toggle("tile3off");
    chartTile2on.classList.toggle("chartTile2on");
    chartTile2on.classList.toggle("chartTile2off");
    tile4on.classList.toggle("tile4on");
    tile4on.classList.toggle("tile4off");
    mapTileoff.classList.toggle("mapTileoff");
    mapTileoff.classList.toggle("mapTileon");
    chartTileoff.classList.toggle("chartTileoff");
    chartTileoff.classList.toggle("chartTileon");
    backButtonOff.classList.toggle("backButtonOff");
    backButtonOff.classList.toggle("backButtonOn");
    backgroundVideo.classList.toggle("backgroundVideo");
    backgroundVideo.classList.toggle("backgroundVideo2");
  }
});

let scenarioButtons = document.querySelectorAll(".scenarioButton");

for (let i = 0; i < scenarioButtons.length; i++) {
  scenarioButtons[i].addEventListener("click", () => {
    myChart.data.datasets[0].data = predictionArray[i];
    myChart.data.labels = predictionYear;
    myChart.update("active");
  });
}

// Paragraph changes by timeot function
let dataInfoPara = document.querySelector(".dataInfoPara");

setTimeout(function () {
  dataInfoPara.textContent =
    "Please click on any tile below to enter data visualisation ";
}, 9000);
