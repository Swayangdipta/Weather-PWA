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
    <div className="perHour" style={currentTime >= 18 ? {color: "#eeeeee"} : {color: "#333333"}}>
        {hour}:{minutes} {amPm}
    </div>
  )
}

export default PerHour