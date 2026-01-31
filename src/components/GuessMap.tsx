import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '../types';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface GuessMapProps {
  onLocationSelect: (coords: Coordinates) => void;
  selectedLocation: Coordinates | null;
  disabled?: boolean;
}

function LocationMarker({
  onLocationSelect,
  selectedLocation,
  disabled,
}: GuessMapProps) {
  const [position, setPosition] = useState<Coordinates | null>(selectedLocation);

  useMapEvents({
    click(e) {
      if (disabled) return;
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(coords);
      onLocationSelect(coords);
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

export default function GuessMap({
  onLocationSelect,
  selectedLocation,
  disabled = false,
}: GuessMapProps) {
  return (
    <div className="map-container">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          onLocationSelect={onLocationSelect}
          selectedLocation={selectedLocation}
          disabled={disabled}
        />
      </MapContainer>
      {!disabled && (
        <p className="map-instruction">Click on the map to place your guess</p>
      )}
    </div>
  );
}
