import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FaSearchLocation} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import { getLocations } from './helper/apiCalls';
import { toast } from 'react-toastify';
import { LocationContext } from '../Context/LocationContext';
import SearchBarPopup from './SearchBarPopup';
import Rolling from '../Assets/imgs/Rolling.svg';;

const Header = () => {
    const [location,setLocation] = useContext(LocationContext);
    const [currentTime,setCurrentTime] = useState(0)
    const [locations,setLocations] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const [isSearchOpen,setIsSearchOpen] = useState(false);
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
        setIsOpen(false);
        setQuery("");
    }

    useEffect(()=>{
        let time = new Date().getHours();
        setCurrentTime(time);
    },[])
  return (
    <header className='header' style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)"} : {backgroundColor: "rgba(255, 255, 255, 0.75)"}}>
        <Link to="/">
            <h2 className="header__branding" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>Weathering</h2>
        </Link>
        <nav className='header__nav'>
            <form className="header__search" onFocus={e=>setIsOpen(true)}>
                <input value={query} onChange={e=>setQuery(e.target.value)} type="text" id="" className="header__search__bar" placeholder='Search location...' />
                <button onClick={handleSearch} type="submit" className="header__search__btn">{
                    isLoading ? (<img src={Rolling} className='searching__icon' />) : (<FaSearchLocation />)
                }</button>
            </form>
            {
                isSearchOpen ? (<div className="close__searchResults close__search" ><AiFillCloseCircle onClick={e=>setIsSearchOpen(false)} /></div>)
                 : (<button id='header__search__btn__md' onClick={e=>setIsSearchOpen(!isSearchOpen)} type="submit" className="header__search__btn"><FaSearchLocation /></button>)
            }
        </nav>

        {
            isOpen && (
                <div className="searchResults" style={currentTime >= 18 ? {backgroundColor: "rgba(17, 25, 40, 0.75)"} : {backgroundColor: "rgba(255, 255, 255, 0.75)"}}>
                    <div className="close__searchResults" ><AiFillCloseCircle onClick={e=>setIsOpen(false)} /></div>
                    <div className="search__result__wrapper">
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

        {
            isSearchOpen && (<SearchBarPopup setIsSearchOpen={setIsSearchOpen} />)
        }
    </header>
  )
}

export default Header