const weatherIcon = document.querySelector(".weather-icon");

async function updateWeatherInfo(data) {
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