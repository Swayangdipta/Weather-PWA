import React, { useState } from 'react'
import Hourly from './Hourly';
import WeatherCard from './WeatherCard'
import WeeklyWeather from './WeeklyWeather'

const WeatherBody = () => {
  const [isHourly,setIsHourly] = useState(false);
  return (
    <div className='weatherBody'>
      {
        isHourly ? (<Hourly setIsHourly={setIsHourly} />) : (
          <>
            <WeatherCard setIsHourly={setIsHourly} />
            <WeeklyWeather />       
          </>   
        )
      }

    </div>
  )
}

export default WeatherBody