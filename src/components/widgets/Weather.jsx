import { useEffect, useState } from "react";
import { WEATHER_API_KEY } from "../../constant";

const Weather = ({ id, widgetData, saveData }) => {

    const [weatherData, setWeatherData] = useState(widgetData);
    const [place, setPlace] = useState(widgetData?.location?.name ?? 'delhi')

    const fetchWeatherData = async () => {
        // We can use websockets for realtime data
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${place}&aqi=no`);
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather", data);
        saveData(id, data);
    }

    useEffect(() => {
        fetchWeatherData();
    }, [place]);

    function searchWeather() {
        let searchPlace = document.getElementById(`weather-search-${id}`)?.value;
        setPlace(searchPlace);
    }

    return (<div className="">
        <div className="flex flex-row m-5">
            <input type="text" placeholder={place} id={`weather-search-${id}`} />
            <button className="search-button" onClick={searchWeather}>Search</button>
        </div>
        {weatherData ? (
            <div className="weather">
                <p>Temperature: {weatherData.current.temp_c}*C</p>
                <p>Condition: {weatherData.current.condition.text}</p>
                <img src={weatherData.current.condition.icon} alt="Weather Condition" />
            </div>
        ) : (<p>Loading...</p>)}
    </div>);
}

export default Weather;