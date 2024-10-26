import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { defaultCordinates } from "../constants/config";
import fetchCoordinates from "../utils/getGeoLocation";

import { getScreenWidth } from "../utils/screenWidth";
const screenWidth: number = getScreenWidth();
const defaultMapDimension: string = `${screenWidth}px`;

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface MapProps {
  height?: string; // Optional height prop
  width?: string; // Optional width prop
}
const Map: React.FC<MapProps> = ({
  height = defaultMapDimension,
  width = defaultMapDimension,
}) => {
  type Position = [number, number];

  useEffect(() => {
    fetchCoordinates().then((res) => {
      setPosition([res.latitude, res.longitude]);
    });
  }, []);

  const [position, setPosition] = useState<Position>([
    defaultCordinates.latitude,
    defaultCordinates.longitude,
  ]);

  return (
    <MapContainer 
    key={position.join(',')}
    center={position} 
    zoom={13} 
    style={{ height, width }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
