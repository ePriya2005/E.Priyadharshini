const apiKey = 'your_openweathermap_api_key'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');
    
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === "404") {
            alert("City not found. Please try again.");
            return;
        }
        
        const cityName = data.name;
        const weatherDesc = data.weather[0].description;
        const temp = data.main.temp;
        const iconCode = data.weather[0].icon;

        // Displaying weather information
        document.getElementById('city-name').innerText = cityName;
        document.getElementById('temp').innerText = `${temp}°C`;
        document.getElementById('description').innerText = weatherDesc;
        document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDesc}" />`;

        weatherInfo.style.display = 'block';
    } catch (error) {
        alert("Error fetching data. Please try again.");
        console.error(error);
    }
}
