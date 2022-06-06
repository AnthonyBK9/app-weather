import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import images from '../assets/js/images'

const Card = () => {

    const [latLon, setlatLon] = useState();
    const [weather, setWeather] = useState();
    const [temp, setTemp] = useState(true);

    const toggleTemp = () => setTemp(!temp); 
    useEffect(() => {

        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            setlatLon({lat, lon});
        }
        navigator.geolocation.getCurrentPosition(success);

    }, []);

    useEffect(() => {
        if (latLon !== undefined) {
            const Api_key = 'a18c7b7aaa9b766b75c0336c97e8d9c5';
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${Api_key}`;
            axios.get(URL)
                .then((res) => { setWeather(res.data)})
                .catch((err => console.log(err)))
        }
    }, [latLon]);
    let weatherId;
    images.forEach( img => {    
        if (img.title === (weather?.weather[0].main)) {
            weatherId = img.img;
        }
    });
    return (
      <article className="container">
        <div className="card">
          <button className="btn-card">Actualizar</button>
            <div className="card-header">
                <div className="card-title">
                    <h1>Weather App</h1>
                </div>
                <div className="card-header-content">
                    <h2>{weather?.name}</h2>
                    <h2>{weather?.sys.country}</h2>     
                </div>
            </div>
            <div className="card-body">
                <h3 className="country">{(weather?.weather[0].main) }</h3>
                <img src={weatherId} alt="weather-icon" className="card-img"/>
                <h3 className="color-white"><b>Temp:</b> {  temp ? (weather?.main.temp -273.15).toFixed(1) : weather?.main.temp } { temp ? 'ºC': 'ºF'} </h3>
                    <div className="temp">
                        <h4 className="color-white"><b>Temp max:</b> { temp ? (weather?.main.temp_max -273.15).toFixed(1) : weather?.main.temp_max } { temp ? 'ºC': 'ºF'}</h4>
                        <h4 className="color-white"><b>Temp min:</b> { temp ? (weather?.main.temp_min -273.15).toFixed(1) : weather?.main.temp_min } { temp ? 'ºC': 'ºF'}</h4>
                    </div>
                <p><b>Wind speed:</b> {weather?.wind.speed} m/s</p>
                <p><b>Clouds: </b> {weather?.clouds.all}%</p>
                <button className="btn-card" onClick={toggleTemp}>Degrees ºC/ºF</button>
            </div>
        </div>
      </article>
    )
}

export default Card