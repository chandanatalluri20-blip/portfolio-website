const apiKey = "8fff999d42942c49808bc98b307bf99e";
const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");

const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("weather-description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const weatherBox = document.getElementById("weather-box");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const weatherMain = data.weather[0].main.toLowerCase();

      cityNameEl.textContent = `City: ${data.name}, ${data.sys.country}`;
      temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
      descriptionEl.textContent = `Weather: ${data.weather[0].description}`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeedEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;

      // Change background based on weather
      if (weatherMain.includes("cloud")) {
        weatherBox.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
        weatherBox.style.color = "white";
      } else if (weatherMain.includes("rain")) {
        weatherBox.style.background = "linear-gradient(to bottom, #4b79a1, #283e51)";
        weatherBox.style.color = "white";
      } else if (weatherMain.includes("clear")) {
        weatherBox.style.background = "linear-gradient(to bottom, #56ccf2, #2f80ed)";
        weatherBox.style.color = "white";
      } else if (weatherMain.includes("snow")) {
        weatherBox.style.background = "linear-gradient(to bottom, #e0eafc, #cfdef3)";
        weatherBox.style.color = "black";
      } else if (weatherMain.includes("thunderstorm")) {
        weatherBox.style.background = "linear-gradient(to bottom, #373b44, #4286f4)";
        weatherBox.style.color = "white";
      } else {
        weatherBox.style.background = "white"; // default
        weatherBox.style.color = "black";
      }
    })
    .catch(error => {
      cityNameEl.textContent = "";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
      humidityEl.textContent = "";
      windSpeedEl.textContent = "";
      weatherBox.style.background = "white";
      weatherBox.style.color = "black";
      alert(error.message);
    });
});
