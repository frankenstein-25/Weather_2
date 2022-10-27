import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Country from './Components/Country';
import {useState,useEffect} from 'react'
import City from './Components/City';
import Weather from './Components/Weather';
import LatLon from './Components/LatLon';
function App() {
   
  const [allCountries ,setAllCountries] = useState([]);
  const [cities ,setCities] = useState([]);
  const [country ,setCountry] = useState(null);
  const [city ,setCity] = useState(null);
  const [lat,setLat]= useState();
  const [lon,setLon]= useState();
  const[temp,setTemp]=useState();

 
  return (
    <Container className='padding' maxWidth="md" >
      <Paper elevation={0}>
        <header>
          <h1 className='heading'>Weather App</h1>
        </header>
         <Country  
            setAllCountries={setAllCountries} 
            allCountries={allCountries}
            setCountry={setCountry}
            setCity={setCity}
            city={city}
          />
          { <City 
            country={country}
            cities={cities}
            setCities={setCities}
            setCity = {setCity}
            city={city}
     
          />}
         
          {city && (<LatLon  city={city} setLat={setLat} setLon={setLon} />)}
          {lat && lon && (<Weather city={city} country={country} setLat={setLat} setLon={setLon} lat={lat} lon={lon} setTemp={setTemp} temp={temp}/>)}
      </Paper>
    </Container>
  );
}

export default App;
