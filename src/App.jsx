import './App.css'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import Card from './components/Card'
import images from './assets/js/images'
import Loader from './components/Loader'

function App() {

    const [latLon, setlatLon] = useState();
    const [weather, setWeather] = useState();
    const [temp, setTemp] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const toggleTemp = () => setTemp(!temp);
    const toggleUpdate = () => setUpdate(!update);
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
                .finally( () => setIsLoading(false))
        }
    }, [latLon]);
    
    const tempW = {
        tC: (weather?.main.temp - 273.15).toFixed(1),
        tCMin: (weather?.main.temp_min - 273.15).toFixed(1),
        tCMax: (weather?.main.temp_max - 273.15).toFixed(1),
        tF: (weather?.main.temp),
        tFMin: (weather?.main.temp_min),
        tFMax: (weather?.main.temp_max)
    }

  return (
    <div className="App">
      <img src={images[0].img} alt={images[1].title} className="img-weather" />
      {
        isLoading ? 
          <Loader />
        : 
        <Card 
          weather={weather}
          toggleUpdate={toggleUpdate}
          toggleTemp={toggleTemp}
          temp={temp}
          tempW={tempW}
        />
      }
    </div>
  )
}

export default App
