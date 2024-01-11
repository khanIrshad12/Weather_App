'use client'
import React, { useEffect, useState } from 'react'
import TopCityButton from './TopCityButton'
import SearchIput from './SearchIput'
import TimeAndLocation from './TimeAndLocation'
import TemperatureAndDetails from './TemperatureDetails'
import getFormattedWeatherData from '@/services/Weatherservice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForcastPage from './ForcastPage'

const WeatherCard = () => {
    const [query, setQuery] = useState({q:"Mumbai"});
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    useEffect(()=>{
        const fetchData=async()=>{
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                toast.success(
                  `Successfully fetched weather for ${data.name}, ${data.country}.`
                )
               
                setWeather(data);
              }).catch(e=>{
                toast.error("Please enter correct place!!")
                console.log("something went wrong",e)})
        }
        fetchData()
    },[query,units]);
    const formatBackgroundColor=()=>{
      if(!weather) return "from-cyan-700 to-blue-700";
      const threshold = units === "metric" ? 20 : 60;
      if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";
      return "from-yellow-700 to-orange-700";
    }
  return (
    <>
  <h1 className={`text-md md:text-3xl font-bold flex justify-center my-3 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent    ${formatBackgroundColor()} `} >Weather APP</h1>
    <div className={`Container-Main mx-auto sm:max-w-screen-md max-w-screen-sm  my-10  py-5 px-15 md:px-20 lg:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 ${formatBackgroundColor()} `}>
    

        <TopCityButton setQuery={setQuery}/>
        <SearchIput setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather ? <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
        <ForcastPage title="hourly forecast" items={weather.hourly} />
        <ForcastPage title="daily forecast" items={weather.daily} />
        </div>:" No Data found"}
        
      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
       
    </div>
    </>
  )
}

export default WeatherCard