// Function to fetch current weather data from OpenWeatherMap API
async function fetchWeatherData(location) {
    const apiKey = 'aa0afdb0896bdd29c45131ed09b8f456'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data: ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to display weather information on the UI
function displayWeatherInfo(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = weatherData ? `
        <h2>Weather Information for ${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Weather Description: ${weatherData.weather[0].description}</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    ` : '<p>No weather data available</p>';
}

// Function to handle user input and trigger weather data fetch
function handleLocationInput() {
    const location = document.getElementById('locationInput').value;

    if (location) {
        fetchWeatherData(location)
            .then(weatherData => {
                displayWeatherInfo(weatherData);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    } else {
        alert('Please enter a location.');
    }
}