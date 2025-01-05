const apiKey = WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherData(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    else {

        var data = await response.json();
        //console.log(data);

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
}

searchButton.addEventListener("click", function () {
    getWeatherData(searchBox.value);
});