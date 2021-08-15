import React,{useState,useEffect} from 'react';
import "./style.css";
import WeatherCard from './WeatherCard';

const WeatherApp = () => {
    const [inputVlaue,setInputValue]=useState("ghaziabad");
    const [tempInfo,setTempInfo]=useState({});
    const getInfo=async()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${inputVlaue}&units=metric&appid=5933976440c409685484ffc4ac1340e5`;
            let res=await fetch(url);
            let data=await res.json();
            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myWeatherInfo={
                temp,humidity,pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }
            // console.log(myWeatherInfo);
            setTempInfo(myWeatherInfo);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getInfo();
    }, [])
    return (
        <>
          <div className="wrap">
              <div className="search">
                  <input type="search" 
                  id="search"
                  className="searchTerm" 
                  value={inputVlaue}
                  onChange={(event)=>{setInputValue(event.target.value)}}
                  autoFocus
                  placeholder="🔍search..."/>
                  <button className="searchButton"
                  onClick={getInfo}

                  >Search</button>

              </div>
              </div> 
            <WeatherCard tempInfo={tempInfo}/>            
        </>
    )}
export default WeatherApp;
