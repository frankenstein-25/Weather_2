import * as React from 'react'
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';

export default function City({city:value,cities,setCities, setCity,country}) {
    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] =React.useState(true);
    const [dis,setdisable] =React.useState(true);

    // const loading = open && options.length === 0;
    const fetchCitiesData = async ()=>{
        setLoading(true);
        try {
          const API_City = `https://countriesnow.space/api/v0.1/countries/cities/q?country=${country}`;
          const response = await fetch(`${API_City}`);
          if (!response.ok) throw Error("didn't receive data");
          const itemlist = await response.json();
          setCities(itemlist.data);
        }
        catch (err) {
        }
        setLoading(false);
      }
      
      useEffect(()=>{
          setCity(null);
          setCities([]);
          setdisable(false);
          country && (async () => await fetchCitiesData())()
        },[country]);
        
        useEffect(()=>{
              setLoading(false);
              setdisable(true);
        },[]);
  return (
    <div  className="container">
    <Autocomplete
    open={open}
    onOpen={() => {
      setOpen(true);
    }}
    onClose={() => {
      setOpen(false);
    }}
    isOptionEqualToValue={(option, value) => option.name === value.name }
    
        options={cities} 
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
            <Box style={{ color: 'rgb(8, 8, 39)' }} component="li" {...props}>
                {option}
            </Box>
        )}
        
        disabled={dis}
        onChange={(event, newValue) => {
            if (newValue){
                setCity(newValue)
            }
        }}
        loading={loading}
        renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                    }}
                />
            )}
    />  
</div>
  )
}
