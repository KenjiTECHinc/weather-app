const apiKey = "27e22fe63265aa03737af79d4ed52258";
const mainApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?limit=1";
const aqiUrl = "http://api.openweathermap.org/data/2.5/air_pollution?";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherData(city) {
    const response = await fetch(geoUrl + `&q=${city}` + `&appid=${apiKey}`);
    //const response = await fetch(mainApiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    else {

        var data = await response.json();
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var weatherData = (await fetch(mainApiUrl + `&lat=${lat}&lon=${lon}` + `&appid=${apiKey}`)).json();
        const aqiData = (await fetch(aqiUrl + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`)).json();
        updateWeatherInfo(weatherData);

    }
}

searchButton.addEventListener("click", function () {
    getWeatherData(searchBox.value);
});