const apiKey = WEATHER_API_KEY;
const mainApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?limit=1";
const aqiUrl = "http://api.openweathermap.org/data/2.5/air_pollution?";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherData(city) {
    const response = await fetch(mainApiUrl + `&q=${city}` + `&appid=${apiKey}`);
    console.log(response.status)

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    else {
        document.querySelector(".error").style.display = "none";
        var weatherData = await response.json();

        const geoResponse = await fetch(geoUrl + `&q=${city}` + `&appid=${apiKey}`);
        var geoData = await geoResponse.json();

        var lat = geoData[0].lat;
        var lon = geoData[0].lon;
        console.log(lat, lon);

        const aqiData = await fetch(aqiUrl + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`);
        updateWeatherInfo(weatherData);
        updateAqiInfo(aqiData);

    }
}

searchButton.addEventListener("click", function () {
    getWeatherData(searchBox.value);
});

async function updateWeatherInfo(data) {
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".condition").innerHTML = data.weather[0].main;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "assets/cloudy.png";
    }
    else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "assets/rain.png";
    }
    else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "assets/sunny.png";
    }
    else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "assets/snow.png";
    }
    else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "assets/mist.png";
    }
    else if (data.weather[0].main === "Thunderstorm") {
        weatherIcon.src = "assets/thunderstorm.png";
    }
    else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "assets/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    return data;
}

async function updateAqiInfo(aqiData) {
    aqiData = await aqiData.json();

    document.querySelector(".aqi-value").innerHTML = aqiData.list[0].main.aqi;
    document.querySelector(".pm-value").innerHTML = aqiData.list[0].components.pm2_5 + " μg/m3";
    document.querySelector(".pm10-value").innerHTML = aqiData.list[0].components.pm10 + " μg/m3";
    
    switch (aqiData.list[0].main.aqi) {
        case 1:
            document.querySelector(".aqi-value").style.color = "#5df56a";
            break;
        case 2:
            document.querySelector(".aqi-value").style.color = "#f9dc5c";
            break;
        case 3:
            document.querySelector(".aqi-value").style.color = "#f58b5d";
            break;
        case 4:
            document.querySelector(".aqi-value").style.color = "#f55d5d";
            break;
        case 5:
            document.querySelector(".aqi-value").style.color = "#9c388e";
            break;
    }
    return aqiData;
}