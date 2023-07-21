const searchBtn = document.getElementById("search");
const inputValue = document.getElementById("input");
const date = document.getElementById("date");
const error = document.querySelector(".error");
const weatherCard = document.querySelector(".weather_card");
const url =
  "https://api.openweathermap.org/data/2.5/weather?appid=8b69857282b94a8e94c337e752ab27fc&units=metric&q=";

async function getWeatherInfo(loc) {
  weatherCard.style.display = "block";
  const loc_name = loc;
  const response = await fetch(url + loc_name);
  var data = await response.json();
  console.log(data);

  if (data.coord) {
    const locationName = data.name;
    const temparature = data.main.temp;
    const climateMood = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    document.getElementById("location_name").innerHTML = loc_name;
    document.getElementById("temparature_value").innerHTML =
      Math.floor(temparature) + "°C";
    document.getElementById("climate_mood").innerHTML = climateMood;
    document.getElementById("humidity_value").innerHTML = humidity + "%";
    document.getElementById("wind_value").innerHTML =
      (windSpeed * 3.6).toFixed(1) + "km/hr";
    date.innerHTML = new Date().toLocaleDateString("pl-PL");

    if (climateMood === "clouds" || climateMood === "Drizzle") {
      // document.querySelector('.middle').style.background = "url('./images/rain.png')"
    }
  } else {
    error.style.display = "flex";
  }
}
// getWeatherInfo("hyderabad");

searchBtn.addEventListener("submit", (e) => {
    error.style.display = "none"
  e.preventDefault();
  let Location_Name = inputValue.value;
  if (!inputValue) {
    return;
  }
  getWeatherInfo(Location_Name);
  inputValue.value = "";
});
