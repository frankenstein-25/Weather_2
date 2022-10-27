import React, { useEffect } from 'react'


export default function Weather({country,lat,lon,setTemp,temp}) {

  const tempFunc = (temp) =>{
    return Math.round(temp-273);
  }
  const fetchweatherdata = async ()=>{
    try {
      const API_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=786f9aadee727bff5098ae9ae657a075`
      const response = await fetch(`${API_weather}`);
      if (!response.ok) throw Error("didn't receive data");
      const itemlist = await response.json();
      setTemp(itemlist.main.temp)
    }
    catch (err) {
    }
  }
  useEffect(()=>{
    setTemp(null);
  },[country])

  useEffect(()=>{
    lat && lon && (async () => await fetchweatherdata())()
  },[lat,lon]);

  return (
      <>
        { temp && 
          (<div className='data'>
           <div>Temp :</div>  <div className='span'>{tempFunc(temp)} C</div></div>)}
        </>
  )
}
