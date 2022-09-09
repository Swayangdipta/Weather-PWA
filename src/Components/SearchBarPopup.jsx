import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../Context/LocationContext';
import {FaSearchLocation} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import { getLocations } from './helper/apiCalls';
import { toast } from 'react-toastify';
import Rolling from '../Assets/imgs/Rolling.svg';

const SearchBarPopup = ({setIsSearchOpen=f=>f}) => {
    const [location,setLocation] = useContext(LocationContext);
    const [locations,setLocations] = useState([]);
    const [currentTime,setCurrentTime] = useState(0);
    const [query,setQuery] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handleSearch = e => {
        e.preventDefault();
        setIsLoading(true);
        getLocations(query).then(data=>{
            if(!data.error || data.name !== "AxiosError"){
                setLocations(prev => data);
            }
            setIsLoading(false);
        }).catch(err=>{
            toast.error("Something went wrong");
            console.log(err);
            setIsLoading(false);
        })
    }

    const handleLocation = loc => {
        setLocation({lat: loc.lat,lon: loc.lon,for: loc.name});
        setLocations([]);
        setIsSearchOpen(false);
        setQuery("");
    }

    useEffect(()=>{
        let time = new Date().getHours();
        setCurrentTime(time);
    },[])
  return (
    <div className='searchBarPopup'>
        <form className="header__search__md">
            <input value={query} onChange={e=>setQuery(e.target.value)} type="text" id="" className="header__search__bar" placeholder='Search location...' />
            <button onClick={handleSearch} type="submit" className="header__search__btn">{
                isLoading ? (<img src={Rolling} className='searching__icon' />) : (<FaSearchLocation />)
            }</button>
        </form>
        <div className="search__result__wrapper search__result__wrapper__md">
            {
                locations.length > 0 ? locations.map((loc,index)=>(
                    <div key={index} className="search__result" onClick={e=>handleLocation(loc)}>
                        <h3 className="loc__name">{loc.name}</h3>
                        <p className="loc__info">{loc.country} | {loc.state}</p>
                    </div>
                )) : (
                    <div className="search__noRes" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Nothing found</div>
                )
            }                        
        </div>
    </div>
  )
}

export default SearchBarPopup