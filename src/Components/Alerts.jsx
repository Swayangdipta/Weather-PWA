import React, { useContext } from 'react'
import { WeatherContext } from '../Context/WeatherContext';
import {GoAlert} from 'react-icons/go';
import {AiFillCloseCircle} from 'react-icons/ai';

const Alerts = ({setOpenAlert=f=>f}) => {
    const [weather,setWeather] = useContext(WeatherContext);
  return (
    <div className='weather__alerts__container'>
        <div className='weather__alerts__wrapper'>
            <div className="close__alert"><AiFillCloseCircle onClick={e=>setOpenAlert(false)} /></div>
            <h3 className="weather__alerts__title">Alert <span><GoAlert /></span></h3>
            <h3 className="weather__alert__name">{weather.alerts[0].event}</h3>
            <p className="weather__alert__desc">{weather.alerts[0].description}</p>
            <p className="weather__alert__timimg">Start: {new Date(weather.alerts[0].start * 1000).toString().slice(4,24)}</p>
            <p className="weather__alert__timimg">End: {new Date(weather.alerts[0].end * 1000).toString().slice(4,24)}</p>
            <p className="weather__alert__source">Source: {weather.alerts[0].sender_name}</p>
        </div>
    </div>
  )
}

export default Alerts