import React, { useEffect, useState } from 'react'

const PerHour = ({perHour}) => {
    const [currentTime,setCurrentTime] = useState(0);

    let date = new Date(perHour.dt * 1000);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amPm = "AM";

    if(hour === 0){
        hour = 12;
    }else if(hour > 12){
        hour = hour - 12;
        amPm = "PM";
    }

    useEffect(()=>{
        let date = new Date();
        setCurrentTime(date.getHours());
    },[])

  return (
    <div className="perHour" style={currentTime >= 18 ? {background: "rgba(0, 0, 0, 0.535)",color: "#eeeeee"} : {background:"rgba(255, 255, 255, 0.535)",color: "#333333"}}>
        <div className="perHourTiming">{hour}:{minutes} {amPm}</div>
        <div className="dailyWeather__date">
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Temp.</div>
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "aqua"} : {color: "#003a3a"}}>{perHour.temp.toPrecision(3)} °C</div>
        </div>

        <div className="dailyWeather__date">
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Humidity</div>
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "aqua"} : {color: "#003a3a"}}>{perHour.humidity} %</div>
        </div>

        <div className="dailyWeather__date">
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Cond.</div>
            <div className='dailyWeather__leading' style={currentTime >= 18 ? {color: "aqua"} : {color: "#003a3a"}}>{perHour.weather[0].main}</div>
        </div>
    </div>
  )
}

export default PerHour