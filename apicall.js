const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";
const HEADERS = {
  headers: {
    "User-Agent": "https://github.com/VirreT/Fetch-API (viktor.tylus@skola.botkyrka.se)"
  }
};

async function fetchWeather(lat, lon) {
  try {
    const response = await axios.get(`${API_URL}?lat=${lat}&lon=${lon}`, HEADERS);
    const data = response.data;
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather-data").textContent = "Failed to fetch weather data.";
  }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById("weather-data");
    const timeseries = data.properties.timeseries;
  
    if (timeseries && timeseries.length > 0) {
      const forecast = timeseries[0].data.instant.details;
  
      function getWeatherIcon(symbolCode) {
        const weatherIcons = {
          clearsky_day: "☀️",
          clearsky_night: "🌙",
          partly_cloudy_day: "🌤️",
          partly_cloudy_night: "🌙☁️",
          cloudy: "🌥️",
          rain: "🌧️",
          rain_showers_day: "🌦️",
          rain_showers_night: "🌧️🌙",
          snow: "🌨️",
          snow_showers_day: "🌨️",
          snow_showers_night: "🌨️🌙",
          thunderstorm: "⛈️",
          sleet: "🌨️🌧️",
          fog: "🌫️",
          fair_night: "🌙☁️",
          fair_day: "🌤️",
          lightrain: "🌧️",
        };
  
        return weatherIcons[symbolCode] || "❓";
      }

      function getWeatherDescription(symbolCode) {
        const weatherDescriptions = {
          clearsky_day: "Clear sky",
          clearsky_night: "Clear sky",
          partly_cloudy_day: "Partly cloudy",
          partly_cloudy_night: "Partly cloudy",
          cloudy: "Cloudy",
          rain: "Rain",
          rain_showers_day: "Rain showers",
          rain_showers_night: "Rain showers",
          snow: "Snow",
          snow_showers_day: "Snow showers",
          snow_showers_night: "Snow showers",
          thunderstorm: "Thunderstorm",
          sleet: "Sleet",
          fog: "Fog",
          fair_night: "Fair",
          fair_day: "Fair",
          lightrain: "Light rain"
        };
      
        return weatherDescriptions[symbolCode] || "Unknown weather condition";
      }
  
      const nextHourForecast = timeseries[0].data.next_1_hours?.summary?.symbol_code || "N/A";
      const weatherIcon = getWeatherIcon(nextHourForecast);
      const weatherDescription = getWeatherDescription(nextHourForecast);

      console.log(nextHourForecast);
  
      weatherDiv.innerHTML = `
        <p id="weatherIcon">${weatherIcon}</p>
        <p id="weather"><strong>${weatherDescription}</strong></p>
        <p id="temp">${forecast.air_temperature} °C</p>
        <p><strong>Wind Speed</strong><br> ${forecast.wind_speed} m/s</p>
        <p><strong>Humidity</strong><br> ${forecast.relative_humidity} %</p>`;
    } else {
      weatherDiv.textContent = "No weather data available.";
    }
  }

  function getWeather() {
    var lat = document.getElementById("latitude").value;
    var lon = document.getElementById("longitude").value;
    var coordinates= document.getElementById("coordinates");

    fetchWeather(lat, lon);
    coordinates.innerHTML = `<strong>${lat}°N ${lon}°W</strong>`;
  }

getWeather();