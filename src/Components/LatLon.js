import React,{useEffect} from 'react'
export default function LatLon({country,city,setLat,setLon}) {
    const fetchLatLonData = async ()=>{
        try {
          const API_Lat_Lon =  `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=786f9aadee727bff5098ae9ae657a075`; 
          const response = await fetch(`${API_Lat_Lon}`);
          if (!response.ok) throw Error("didn't receive data");
          const itemlist = await response.json();
          setLat(itemlist[0].lat);
          setLon(itemlist[0].lon);
        }
        catch (err) {
        //   setError(err);
        }
      }

      useEffect(()=>{
        city && (async () => await fetchLatLonData())()
      },[city]);

  return (
    <></>
  )
}
