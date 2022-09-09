import React, { useContext, useEffect, useState } from 'react';
import {BiArrowBack} from 'react-icons/bi';
import { WeatherContext } from '../Context/WeatherContext';
import PerHour from './PerHour';

const Hourly = ({setIsHourly=f=>f}) => {
    const [weather,setWeather] = useContext(WeatherContext);
    const [currentTime,setCurrentTime] = useState(0);

    useEffect(()=>{
        let date = new Date();
        setCurrentTime(date.getHours());
    },[])
  return (
    <div className='hourly__wrapper' style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)"} : {backgroundColor: "rgba(255, 255, 255, 0.75)"}}>
        <div className="openWeatherCard" onClick={e=>setIsHourly(false)} style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}><span className='openWeatherCard__icon'><BiArrowBack /></span><span>Go back</span></div>
        <div className="hourly__title" style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)",color: "#eeeeee"} : {backgroundColor: "rgba(255, 255, 255, 0.75)",color: "#333333"}}>Hourly</div>
        <div className="hourly__container">
            {
                weather.hourly && weather.hourly.map((perHour,index)=>(
                    <PerHour key={index} perHour={perHour} />
                ))
            }
        </div>
    </div>
  )
}

export default Hourly