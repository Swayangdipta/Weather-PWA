import React , {createContext, useState} from 'react';

export const LocationContext = createContext();

export const LocationProvider = props => {
    const [location,setLocation] = useState({lat: 0,lon: 0,for: "Knowhere"});

    return(
        <LocationContext.Provider value={[location,setLocation]}>
            {props.children}
        </LocationContext.Provider>
    )
}