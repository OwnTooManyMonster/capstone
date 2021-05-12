import * as main from "./main.js";
// MAPBOX
mapboxgl.accessToken =
  "pk.eyJ1Ijoib3dudG9vbWFueW1vbnN0ZXIiLCJhIjoiY2tvNzMwMGpuMjk4ZDJvbXZqaHBqanlpbSJ9.DHukChuKakMnzj-mieZ1Og";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/owntoomanymonster/cko940hfa43dl18lotmyn2lzp", // style URL
  center: [-2.81361, 36.77271], // starting position [lng, lat]
  zoom: 0, // starting zoom
});

// API FETCH

//5 times fetch since differnt mandatory Year Selection (10 years max by NOAA Server)

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
function masterFetch() {
  fetchArray.forEach((element) => arrayFetch(element));
}
//masterFetch();
// ARRAY FETCH FUNCTION CALLED IN MASTERFETCH FUNCTION
function arrayFetch(element) {
  fetch(element, {
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

/// DATA CONVERSION FOR CHART.JS

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

let stationArray = [
  NOE00134778,
  GME00111445,
  SPE00120458,
  USW00012836,
  USW00022521,
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
console.log(USW00022521);
let controlYears = [
  "1975-01-01T00:00:00",
  "1976-01-01T00:00:00",
  "1977-01-01T00:00:00",
  "1978-01-01T00:00:00",
  "1979-01-01T00:00:00",
  "1980-01-01T00:00:00",
  "1981-01-01T00:00:00",
  "1982-01-01T00:00:00",
  "1983-01-01T00:00:00",
  "1984-01-01T00:00:00",
  "1985-01-01T00:00:00",
  "1986-01-01T00:00:00",
  "1987-01-01T00:00:00",
  "1988-01-01T00:00:00",
  "1989-01-01T00:00:00",
  "1990-01-01T00:00:00",
  "1991-01-01T00:00:00",
  "1992-01-01T00:00:00",
  "1993-01-01T00:00:00",
  "1994-01-01T00:00:00",
  "1995-01-01T00:00:00",
  "1996-01-01T00:00:00",
  "1997-01-01T00:00:00",
  "1998-01-01T00:00:00",
  "1999-01-01T00:00:00",
  "2000-01-01T00:00:00",
  "2001-01-01T00:00:00",
  "2002-01-01T00:00:00",
  "2003-01-01T00:00:00",
  "2004-01-01T00:00:00",
  "2005-01-01T00:00:00",
  "2006-01-01T00:00:00",
  "2007-01-01T00:00:00",
  "2008-01-01T00:00:00",
  "2009-01-01T00:00:00",
  "2010-01-01T00:00:00",
  "2011-01-01T00:00:00",
  "2012-01-01T00:00:00",
  "2013-01-01T00:00:00",
  "2014-01-01T00:00:00",
  "2015-01-01T00:00:00",
  "2016-01-01T00:00:00",
  "2017-01-01T00:00:00",
  "2018-01-01T00:00:00",
  "2019-01-01T00:00:00",
  "2020-01-01T00:00:00",
]; // if element controlyears found in array create element in new array else create element controlyear as element in new array with the data of the element controlyear before
