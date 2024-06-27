// app/Component/MapPage.jsx
"use client"; // Add this line at the very top

import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import { processData } from '../../utils/dataProcessing'; // Adjust the import path as necessary

const MapPage = () => {
  const [data, setData] = useState({ polygonCoordinates: [], heatmapPoints: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the CSV content
    fetch('../data/TestFarm.csv')
      .then(response => response.text())
      .then(csvContent => {
        const processedData = processData(csvContent);
        setData(processedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading CSV data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <MapComponent data={data} />;
};

export default MapPage;
