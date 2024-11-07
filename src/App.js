import './App.css';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '479d87196e6f88177b61f221cb51b090';

  // Get current date
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  // Fetch weather data
  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }, [city, API_KEY]);

  // Run fetchWeatherData on mount and city change
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Handle input change
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.jpg";
      case "Rain":
        return "/rain.jpeg";
      case "Mist":
        return "/tornado.jpeg";
      case "Haze":
        return "/sunny.jpeg"
      default:
        return "/default.png";
    }
  }

  return (
    <div className="App">
      <div className='container'>
        {weatherData && (
          <>
            <h1 className='container_date'>{formattedDate}</h1>
            <div className='weather_data'>
              <h2 className='container_city'>{weatherData.name}, {weatherData.sys?.country}</h2>
              <br />   <br />
              <img 
                className='container_img' 
                src={getWeatherIconUrl(weatherData.weather?.[0].main)} 
                width="180px" 
                height="150px" 
                alt={weatherData.weather?.[0].main} 
              />
              <h2 className='container_degree'>{weatherData.main?.temp}°C</h2>
              <h2 className='country_per'>{weatherData.weather?.[0].main}</h2>
              <form className='form' onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='input'
                  placeholder='Enter city name'
                  value={city}
                  onChange={handleInputChange}
                />
                <button type='submit'>Get Weather</button>
              </form>
            </div>
          </>
        )}
        {!weatherData && (
          <h2>Loading...</h2>
        )}
        {weatherData && weatherData.cod === "404" && (
          <h2>City not found!</h2>
        )}
      </div>
    </div>
  );
};

export default App;