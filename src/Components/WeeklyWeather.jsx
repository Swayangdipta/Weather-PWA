import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../Context/WeatherContext'
import {sunrise,sunset,warmer,colder,raindrops,O1d,O1n,O2d,O2n,O3d,O3n,O4d,O4n,O9d,O9n,S0d,S0n,I0d,I0n,I1d,I1n,I3d,I3n} from './helper/images'


const WeeklyWeather = () => {
    const [weather,setWeather] = useContext(WeatherContext);
    const [currentTime,setCurrentTime] = useState(0);
    const [currentIcon,setCurrentIcon] = useState(O1d);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    useEffect(()=>{
        setCurrentTime(new Date().getHours());
    },[])

    const getWeatherIcon = (iconId) => {
        let icon = O1d;
        switch (iconId) {
            case "01d":
                icon = O1d;
                break;
            case "01n":
                icon = O1n;
                break;
            case "02d":
                icon = O2d;
                break;
            case "02n":
                icon = O2n;
                break;
            case "03d":
                icon = O3d;
                break;
            case "03n":
                icon = O3n;
                break;
            case "04d":
                icon = O4d;
                break;
            case "04n":
                icon = O4n;
                break;
            case "09d":
                icon = O9d;
                break;
            case "09n":
                icon = O9n;
                break;
            case "50d":
                icon = S0d;
                break;
            case "50n":
                icon = S0n;
                break;
            case "10d":
                icon = I0d;
                break;
            case "10n":
                icon = I0n;
                break;
            case "11d":
                icon = I1d;
                break;
            case "11n":
                icon = I1n;
                break;
            case "13d":
                icon = I3d;
                break;
            case "13n":
                icon = I3n;
                break;
        }

        return icon.default
    }
  
    return (
    <div className='weeklyWeather'>
        <h2 className="weeklyWeather__title" style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)",color: "#eeeeee"} : {backgroundColor: "rgba(255, 255, 255, 0.75)",color:"#333333"}}>Weekly Weather</h2>
        <div className="weeklyWeather__wrapper">
            {
                weather?.daily && weather.daily.map((daily,index)=>(
                    index !== 0 && (
                        <div key={index} className="dailyWeather" style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)"} : {backgroundColor: "rgba(255, 255, 255, 0.75)"}}>
                            <div className="dailyWeather__date">
                                <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{months[new Date(daily.dt * 1000).getMonth()]} {new Date(daily.dt * 1000).getDate()}</div>
                                <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "aqua"} : {color: "#003a3a"}}>{daily.weather[0].main}</div>
                            </div>
                            <div className="dailyWeather__date">
                                <img src={warmer.default} alt="Max Temp" />
                                <div style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{daily.temp.max} °C</div>
                            </div>
                            <div className="dailyWeather__date">
                                <img src={colder.default} alt="Min Temp" />
                                <div style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{daily.temp.min} °C</div>
                            </div>
                            <div className="dailyWeather__date">
                                <img src={raindrops.default} alt="Humidity" />
                                <div style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{daily.humidity} %</div>
                            </div>
                            <div className="dailyWeather__date">
                                <img src={getWeatherIcon(daily.weather[0].icon)} alt="Weather Icon" />
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    </div>
  )
}

export default WeeklyWeather