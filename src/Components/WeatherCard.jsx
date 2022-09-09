import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from '../Context/LocationContext';
import { WeatherContext } from '../Context/WeatherContext';
import {BsArrowRightShort} from 'react-icons/bs'
import {sunrise,sunset,warmer,colder,raindrops,O1d,O1n,O2d,O2n,O3d,O3n,O4d,O4n,O9d,O9n,S0d,S0n,I0d,I0n,I1d,I1n,I3d,I3n} from './helper/images'

const WeatherCard = ({setIsHourly=f=>f}) => {
    const [location,setLocation] = useContext(LocationContext);
    const [weather,setWeather] = useContext(WeatherContext);
    const [currentTime,setCurrentTime] = useState(0);
    const [fullTime,setFullTime] = useState({hour: 0,minutes: 0});
    const [currentIcon,setCurrentIcon] = useState(O1d);

    setInterval(()=>{
        let date2 = new Date();
        setFullTime({hour: date2.getHours() < 10 ? "0"+date2.getHours() : date2.getHours(),minutes: date2.getMinutes() < 10 ? "0"+date2.getMinutes() : date2.getMinutes()})
    },10000);
    useEffect(()=>{
        let date = new Date();
        setFullTime({hour: date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),minutes: date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()});
        setCurrentTime(new Date().getHours());
    },[])

    useEffect(()=>{
        switch (weather?.current?.weather[0].icon) {
            case "01d":
                setCurrentIcon(O1d);
                break;
            case "01n":
                setCurrentIcon(O1n);
                break;
            case "02d":
                setCurrentIcon(O2d);
                break;
            case "02n":
                setCurrentIcon(O2n);
                break;
            case "03d":
                setCurrentIcon(O3d);
                break;
            case "03n":
                setCurrentIcon(O3n);
                break;
            case "04d":
                setCurrentIcon(O4d);
                break;
            case "04n":
                setCurrentIcon(O4n);
                break;
            case "09d":
                setCurrentIcon(O9d);
                break;
            case "09n":
                setCurrentIcon(O9n);
                break;
            case "50d":
                setCurrentIcon(S0d);
                break;
            case "50n":
                setCurrentIcon(S0n);
                break;
            case "10d":
                setCurrentIcon(I0d);
                break;
            case "10n":
                setCurrentIcon(I0n);
                break;
            case "11d":
                setCurrentIcon(I1d);
                break;
            case "11n":
                setCurrentIcon(I1n);
                break;
            case "13d":
                setCurrentIcon(I3d);
                break;
            case "13n":
                setCurrentIcon(I3n);
                break;
        }
    },[weather])
  return (
    <div className='weatherCard' style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)"} : {backgroundColor: "rgba(255, 255, 255, 0.75)"}}>
        <div className="weatherCard__top" style={currentTime >= 18 ? {borderColor: "rgb(255 255 255 / 39%)"} : {borderColor: "rgba(51, 51, 51, 0.391)"}}>
            <div className="weatherCard__topL">
                <p className="weather__time" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{fullTime.hour}:{fullTime.minutes}</p>
                <h1 className="weatherCard__location" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{location.for}</h1>
                <p className="weatherCard__condition" style={currentTime >= 18 ? {color: "aqua"} : {color: "#003a3a"}}>{weather?.current?.weather[0].main}</p>
            </div>
            <div className="weatherCard__topR">
                <img className='weatherCard__icon' src={currentIcon.default} alt="" />
            </div>
        </div>
        <div className="weatherCard__bottom">
            <div className="weather__details">
                <img className='weather__details__icon' src={raindrops.default} alt="Humidity" />
                <div className='weather__details__top'>
                    <p className="weather__details__title" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Humidity</p>
                    <p className="weather__details__value" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{weather?.daily && Math.round(weather?.daily[0].humidity)}%</p>
                </div>
            </div>
            <div className="weather__details">
                <img className='weather__details__icon' src={sunrise.default} alt="Sunrise" />
                <div className='weather__details__top'>
                    <p className="weather__details__title" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Sunrise</p>
                    <p className="weather__details__value" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{weather?.daily && new Date(weather?.daily[0].sunrise * 1000).getHours()}:{weather?.daily && new Date(weather?.daily[0].sunrise * 1000).getMinutes()} AM</p>
                </div>
            </div>
            <div className="weather__details">
                <img className='weather__details__icon' src={sunset.default} alt="Sunset" />
                <div className='weather__details__top'>
                    <p className="weather__details__title" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Sunset</p>
                    <p className="weather__details__value" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{weather?.daily && new Date(weather?.daily[0].sunset * 1000).getHours()}:{weather?.daily && new Date(weather?.daily[0].sunset * 1000).getMinutes()} PM</p>
                </div>
            </div>
            <div className="weather__details">
                <img className='weather__details__icon' src={warmer.default} alt="Maximum Temparature" />
                <div className='weather__details__top'>
                    <p className="weather__details__title" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Maximum</p>
                    <p className="weather__details__value" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{weather?.daily && Math.round(weather?.daily[0].temp?.max)}°C</p>
                </div>
            </div>
            <div className="weather__details">
                <img className='weather__details__icon' src={colder.default} alt="Minimum Temparature" />
                <div className='weather__details__top'>
                    <p className="weather__details__title" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Minimum</p>
                    <p className="weather__details__value" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>{weather?.daily && Math.round(weather?.daily[0].temp?.min)}°C</p>
                </div>
            </div>
        </div>
        <div className='weatherCard__view__hourly__wrapper'>
            <div className="weatherCard__view__hourly__container" onClick={e=>setIsHourly(true)}>
                <h2 className="weatherCard__view__hourly" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Hourly</h2>
                <i className="weatherCard__view__hourly__icon" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}><BsArrowRightShort /></i>                
            </div>

        </div>
    </div>
  )
}

export default WeatherCard