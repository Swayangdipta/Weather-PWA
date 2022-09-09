import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeather = (lat,lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(res => {
        return res.data
    }).catch(e=>e);
}

export const getLocations = query => {
    console.log(query);
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`).then(res => {
        return res.data
    }).catch(e=>e);
}

export const getLocationsByCoords = (lat,lon) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`).then(res => {
        return res.data
    }).catch(e=>e);
}