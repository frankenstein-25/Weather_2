import * as React from 'react';
import {useEffect,useState} from 'react'
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const API_Country = 'https://countriesnow.space/api/v0.1/countries/iso';

export default function Country({allCountries,setAllCountries,setCountry,city,setCity}) {

    const fetchCountriesData = async ()=>{
        try {
          const response = await fetch(`${API_Country}`);
          if (!response.ok) throw Error("didn't receive data");
          const itemlist = await response.json();
          setAllCountries(itemlist.data);
        }
        catch (err) {
        }
      }
      useEffect(()=>{
        fetchCountriesData();
      },[]);

  

  return (
    <div>
        <Autocomplete
            options={allCountries} 
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
            <Box style={{ color: 'rgb(8, 8, 39)' }} component="li" {...props}>
                    {option.name}
                </Box>
            )}
            onChange={(event, newValue) => {
                if (newValue){
                    setCountry(newValue.name)
                }
                else{
                    setCountry();
                }
            }}
            
            renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose a country"
                        InputProps={{
                            ...params.InputProps,
                        }}
                    />
                )}
        />  
    </div>
  )
}
