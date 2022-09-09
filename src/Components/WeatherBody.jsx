import React from 'react'
import WeatherCard from './WeatherCard'
import WeeklyWeather from './WeeklyWeather'

const WeatherBody = () => {
  return (
    <div className='weatherBody'>
        <WeatherCard />
        <WeeklyWeather />
    </div>
  )
}

export default WeatherBody