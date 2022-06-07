import React from 'react'
import images from '../assets/js/images'

const Card = ({weather, toggleTemp, temp, tempW}) => {

    let weatherId;
    images.forEach( img => {    
        if (img.title === (weather?.weather[0].main)) {
            weatherId = img.img;
        }
    });
    return (
      <article className="container">
        <div className="card">
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
                <h3 className="color-white"><b>Temp:</b> {  temp ? tempW.tC + 'ºC' : tempW.tF + 'ºF'}</h3>
                    <div className="temp">
                        <h4 className="color-white"><b>Temp max:</b> { temp ? tempW.tCMax + 'ºC' : tempW.tFMax + 'ºF'}</h4>
                        <h4 className="color-white"><b>Temp min:</b> { temp ? tempW.tCMin + 'ºC' : tempW.tFMin + 'ºF'}</h4>
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