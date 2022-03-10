document.addEventListener("DOMContentLoaded", function () {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  navigator.geolocation.getCurrentPosition(success, error, options);

  let nightStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/night.jpg')";
  let sunsetStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/sunset.jpg')";
  let rainStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/rain.jpg')";
  let dayStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/day.jpg')";
  let snowStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/snow.jpg')";
  let thunderStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.4) 100% ),url('./images/thunderstorm.jpg')";
  let cloudStyle =
    "linear-gradient( 90deg, rgba(0,0,0, 0.4) 0%, rgba(0,0,0, 0.6) 100% ),url('./images/cloudy.jpg')";

  function theDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();
    date =  dd + "/" + mm + "/" + yyyy;
    document.getElementById("date").innerText = date;
  }

  function changeTimezone(date, tz) {
    var invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: tz,
      })
    );
    var diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff); // needs to substract
  }

  function getWeather(lat, long) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=354229847f774e2b09271460c83e4247`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let city = result.name;
        let country = result.sys.country;
        document.getElementById("city").innerText = `${city},${country}`;
        let temp = result.main.temp;
        temp = temp.toFixed();
        document.getElementById("temp").innerText = `${temp}°C`;
        let humidityPercent = result.main.humidity;
        document.getElementById(
          "humidity"
        ).innerText = `Humidity: ${humidityPercent}%`;
        let icon = result.weather[0].icon;
        document.getElementById(
          "icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
        let weatherStatus = result.weather[0].description;
        switch (weatherStatus) {
          case "rain":
            document.body.style.background = rainStyle;
            break;
          case "shower rain":
            document.body.style.background = rainStyle;
            break;
          case "thunderstorm":
            document.body.style.background = thunderStyle;
            break;
          case "snow":
            document.body.style.background = snowStyle;
            break;
          case "broken clouds":
            document.body.style.background = cloudStyle;
            break;
          case "few clouds":
            document.body.style.background = cloudStyle;
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log("error", error));
  }

  function background(current) {
    switch (current) {
      case 0:
        document.body.style.background = nightStyle;
        break;
      case 1:
        document.body.style.background = nightStyle;
        break;
      case 2:
        document.body.style.background = nightStyle;
        break;
      case 3:
        document.body.style.background = nightStyle;
        break;
      case 4:
        document.body.style.background = nightStyle;
        break;
      case 5:
        document.body.style.background = nightStyle;
        break;
      case 6:
        document.body.style.background = sunsetStyle;
        break;
      case 7:
        document.body.style.background = sunsetStyle;
        break;
      case 8:
        document.body.style.background = dayStyle;
        break;
      case 9:
        document.body.style.background = dayStyle;
        break;
      case 10:
        document.body.style.background = dayStyle;
        break;
      case 11:
        document.body.style.background = dayStyle;
        break;
      case 12:
        document.body.style.background = dayStyle;
        break;
      case 13:
        document.body.style.background = dayStyle;
        break;
      case 14:
        document.body.style.background = dayStyle;
        break;
      case 15:
        document.body.style.background = dayStyle;
        break;
      case 16:
        document.body.style.background = dayStyle;
        break;
      case 17:
        document.body.style.background = dayStyle;
        break;
      case 18:
        document.body.style.background = sunsetStyle;
        break;
      case 19:
        document.body.style.background = sunsetStyle;
        break;
      case 20:
        document.body.style.background = sunsetStyle;
        break;
      case 21:
        document.body.style.background = nightStyle;
        break;
      case 22:
        document.body.style.background = nightStyle;
        break;
      case 23:
        document.body.style.background = nightStyle;
        break;
      default:
        break;
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    var crd = position.coords;
    let current = new Date();
    theDate(current);
    current = current.getHours();
    background(current);
    getWeather(crd.latitude, crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    fetch("https://ipwhois.app/json/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let lat = result.latitude;
        let long = result.longitude;
        let timeZoneAPI = result.timezone;
        let current = new Date();
        current = changeTimezone(current, timeZoneAPI);
        theDate(current);
        current = current.getHours();
        getWeather(lat, long);
        background(current);
      })
      .catch((error) => console.log("error", error));
  }
});
