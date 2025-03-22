const apiKey = "92b99a890c5fae1a356e6fc983143929";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const weatherIcon = document.getElementById("weatherIcon");
const errorDiv = document.querySelector(".error");

// Function to fetch weather data
async function checkWeather(city) {
    if (!city) {
        errorDiv.innerHTML = "Please enter a city name!";
        errorDiv.style.display = "block";
        weatherInfo.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("windSpeed").innerText = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconMap = {
            clouds: "clouds.png",
            clear: "clear.png",
            rain: "rain.png",
            drizzle: "drizzle.png",
            mist: "mist.png",
            snow: "snow.png"
        };
        weatherIcon.src = `images/${iconMap[weatherCondition] || "default.png"}`;

        weatherInfo.classList.remove("hidden");
        errorDiv.style.display = "none";
    } catch (error) {
        errorDiv.innerHTML = "Invalid city or village name!";
        errorDiv.style.display = "block";
        weatherInfo.classList.add("hidden");
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Trigger search when Enter key is pressed
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
