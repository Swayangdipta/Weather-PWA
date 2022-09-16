import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from '../Context/LocationContext'
import { WeatherContext } from '../Context/WeatherContext'
import { getLocationsByCoords, getWeather } from './helper/apiCalls';
import sunny from '../Assets/imgs/sunny.jpg'
import night from '../Assets/imgs/night.jpg'
import clouds from '../Assets/imgs/cloudsPurple.jpg'
import snow from '../Assets/imgs/snow.jpg'
import rain from '../Assets/imgs/rain.jpg'
import Header from './Header';
import LoadingOverlay from './LoadingOverlay';
import WeatherBody from './WeatherBody';
import Alerts from './Alerts';

const Home = () => {
    const [location,setLocation] = useContext(LocationContext);
    const [weather,setWeather] = useContext(WeatherContext);
    const [bgImg,setBgImg] = useState(sunny);
    const [currentTime,setCurrentTime] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const [openAlert,setOpenAlert] = useState(true);

    const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                getLocationsByCoords(position.coords.latitude,position.coords.longitude).then(data=>{
                    if(!data.error && data.name !== "AxiosError"){
                        setLocation({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            for: data[0].name
                        });                        
                    }
                }).catch(e=>{
                    console.log(e);
                })

            })
        }
    }

    const getCurrentTime = () => {
        let date = new Date();
        let time = date.getHours();
        setCurrentTime({hour: time})
    }

    useEffect(()=>{
        getCurrentTime()
        getLocation()
    },[])

    useEffect(()=>{
        setIsLoading(true);
        if(location.lat !== 0 && location.lon !== 0){
            getWeather(location.lat,location.lon).then(data=>{
                setWeather(data);
                console.log(data);
                setIsLoading(false);
            }).catch(e=>{
                console.log(e);
                setIsLoading(false);
            })       
        }
    },[location])

    useEffect(()=>{
        if(weather.current){
            if(weather.current.weather[0].id === 800){
                if(currentTime.hour < 18){
                    setBgImg(sunny);
                }else{
                    setBgImg(night);
                }

            }else if(weather.current.weather[0].id > 800){
                setBgImg(clouds);
            }else if(weather.current.weather[0].id >= 600 && weather.current.weather[0].id < 700){
                setBgImg(snow);
            }else if(weather.current.weather[0].id >= 200 && weather.current.weather[0].id < 600){
                setBgImg(rain);
            }
        }
        setOpenAlert(true);
    },[weather])

  return (
    <div className='home__container'>
        <img src={bgImg} alt="" className='home__bg' />
        <Header />
        {
            openAlert && weather.alerts && (<Alerts setOpenAlert={setOpenAlert} />)
        }
        <WeatherBody />
        {
            isLoading && (<LoadingOverlay />)
        }
    </div>
  )
}

export default Home