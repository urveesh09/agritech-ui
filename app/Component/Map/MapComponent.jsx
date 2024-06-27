"use client"; // Add this line at the very top
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Polygon, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import 'react-leaflet'
import styles from './MapComponent.module.css';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(
      points.map(p => [p.lat, p.lng, p.intensity]),
      { radius: 20 }
    );
    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const MapComponent = ({ data }) => {
  return (
    <MapContainer center={data.starters} zoom={20} className={styles.mapContainer}>
      <TileLayer 
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.google.com/maps">Google</a> contributors'
      />
      <Polygon positions={data.polygonCoordinates} color="blue" />
      <HeatmapLayer points={data.heatmapPoints} />
      {data.heatmapPoints.map((point, index) => (
        <CircleMarker
          key={index}
          center={[point.lat, point.lng]}
          radius={5}
        >
          <Popup>
            Latitude: {point.lat}<br />
            Longitude: {point.lng}<br />
            Value: {point.value}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
