import React, { useEffect, useState } from "react";
import { BsThermometerHalf, BsWind, BsSpeedometer } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
export default function Weather({ country, lat, lon, setTemp, temp }) {
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [pressure, setPressure] = useState();
  const [name, setName] = useState();
  const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();

  const tempFunc = (temp) => {
    return Math.round(temp - 273);
  };
  const fetchweatherdata = async () => {
    try {
      const API_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=786f9aadee727bff5098ae9ae657a075`;
      const response = await fetch(`${API_weather}`);
      if (!response.ok) throw Error("didn't receive data");
      const itemlist = await response.json();
      setTemp(itemlist.main.temp);
      setHumidity(itemlist.main.humidity);
      setWind(itemlist.wind.speed);
      setPressure(itemlist.main.pressure);
      setName(itemlist);
    } catch (err) {}
  };
  useEffect(() => {
    setTemp(null);
  }, [country]);

  useEffect(() => {
    lat && lon && (async () => await fetchweatherdata())();
  }, [lat, lon]);

  return (
    <>
      {temp && (
        <div>
          <div className="d-flex">
            <div className="data">
              <BsThermometerHalf
                style={{
                  verticalAlign: "text-bottom",
                  fontSize: "4rem",
                  color: "white",
                }}
              />{" "}
              <div className="span"> {tempFunc(temp)} </div>{" "}
              <div className="font"> °c </div>{" "}
              <div className="margin-left">
              <div className="lite">
                <WiHumidity
                  style={{
                    verticalAlign: "sub",
                    fontSize: "1.5rem",
                  }}
                />{" "}
                {humidity} %
              </div>{" "}
              <div className="lite">
                <BsWind
                  style={{
                    verticalAlign: "text-bottom",
                    marginRight: ".2rem",
                  }}
                />{" "}
                {Math.floor(wind * 3.6)} Km/h{" "}
              </div>{" "}
              <div className="lite">
                <BsSpeedometer
                  style={{
                    verticalAlign: "text-bottom",
                    marginRight: ".2rem",
                  }}
                />{" "}
                {pressure} hPa
              </div>          
            </div>{" "}
            </div>
            
            <div className="lite text-right">
                <h2 className="pro">
                  {name.name}, {country}
                </h2>
                <h4 className="lite">{lat.toFixed(4)}° N</h4>
                <h4 className="lite">{lon.toFixed(4)}° E</h4>
              </div>
          </div>{" "}
          <div className="weather">
						<img
							src={`http://openweathermap.org/img/wn/${name.weather[0].icon}@4x.png`}
						/>
						<h1 className="pro">{name.weather[0].description}</h1>
					</div>
          <div className="date-time text-center">
						<h1>
							<span className="time">
								{`${hours % 12}:${minutes < 10 ? `0${minutes}` : minutes} ${
									hours > 12 ? "pm" : "am"
								}`}
							</span>
						</h1>
						<h2 className="lite">{date.toDateString().slice(4)}</h2>
					</div>
        </div>
      )}{" "}
    </>
  );
}
