const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=51.04&lon=-114.08&appid=d6b1b4bfaea6e601002ef03280b2656f&units=metric';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=51.04&lon=-114.08&appid=d6b1b4bfaea6e601002ef03280b2656f&units=metric';

const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-description');
const highTemp = document.querySelector('#temp-high');
const lowTemp = document.querySelector('#temp-low');
const humidityPercent = document.querySelector('#humidity');
const sunriseTime = document.querySelector('#sunrise');
const sunsetTime = document.querySelector('#sunset');

const forecastElements = [
    document.querySelector('#today'),
    document.querySelector('#day-two'),
    document.querySelector('#day-three')
];

async function fetchWeatherData() {
    try {
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(weatherURL),
            fetch(forecastURL)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const desc = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}</strong>&deg; C`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.textContent = capitalizeWords(desc);
    highTemp.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;`;
    lowTemp.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;`;
    humidityPercent.textContent = `Humidity: ${data.main.humidity}%`;
    sunriseTime.textContent = `Sunrise: ${formatTime(sunrise)}`;
    sunsetTime.textContent = `Sunset: ${formatTime(sunset)}`;
}

function displayForecast(data) {
    const selectedForecasts = [];

    for (let item of data.list) {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();

        if (hour === 12) {
            selectedForecasts.push(item);
        }

        if (selectedForecasts.length === 3) break;
    }

    selectedForecasts.forEach((item, index) => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(item.main.temp);

        forecastElements[index].innerHTML = `${dayName}: <strong>${temp}&deg;C</strong`;
    });
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

fetchWeatherData();