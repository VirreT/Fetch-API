
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
    weatherDiv.innerHTML = `
      <p><strong>Temperature:</strong> ${forecast.air_temperature} °C</p>
      <p><strong>Wind Speed:</strong> ${forecast.wind_speed} m/s</p>
      <p><strong>Humidity:</strong> ${forecast.relative_humidity} %</p>
    `;
  } else {
    weatherDiv.textContent = "No weather data available.";
  }
}


fetchWeather(59.91, 10.75);
