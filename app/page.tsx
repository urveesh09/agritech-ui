"use client"; 
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { processData } from './utils/dataProcessing'; // Adjust the import path as necessary
import styles from './styles/Home.module.css';
import InputForm from './Component/InputForm.jsx';
import MiddleMan from './Component/MiddleMan.jsx';
import Weather from './Component/Weather/Weather.jsx'
import Forecast from './Component/Weather/Forecast.jsx'
import axios from 'axios';
// Dynamically import the MapComponent to prevent SSR issues
const MapComponent = dynamic(() => import('./Component/Map/MapComponent'), {
  ssr: false
});
export default function Home() {
  const [selectedColumn, setSelectedColumn] = useState('N');
  const [data, setData] = useState({ polygonCoordinates: [], heatmapPoints: [] ,starters:[]});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the CSV content from the public directory
    // fetch('/data/TestFarm.csv')
    fetch('http://localhost:3020/map')
      .then(response => response.text())
      .then(csvContent => {
        csvContent = JSON.parse(csvContent)
        console.log(typeof(csvContent))
        const processedData= processData(csvContent,selectedColumn);
        console.log(processedData,'This was')
        setData(processedData);
        setLoading(false);
        console.log('Hence we got it from the SQL WorkBench')
      })
      .catch(error => {
        console.error('Error loading CSV data:', error);
        setLoading(false);
      });
  }, [selectedColumn]);
  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };
  return (
    <div className={styles.container}>

      <Head>
        <title>My Agriculture App</title>
        <meta name="description" content="Agriculture app using Next.js and Leaflet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <select value={selectedColumn} onChange={handleColumnChange}>
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
        <option value="humidity">Moisture</option>
        <option value="N">Nitrogen</option>
        <option value="K">Potassium</option>
        <option value="P">Phosphorus</option>
      
      </select>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Agriculture App</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <MapComponent data={data} />
        )}
      <MiddleMan/>
      {/* <InputForm /> */}
      <h1>Current Weather</h1>
        {/* <Weather/> */}
      <h1>Forecast Weather</h1>
      {/* <Forecast/> */}
      </main>
    </div>
  );
}
