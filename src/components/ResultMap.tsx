import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '../types';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom icons for guess vs actual
const guessIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const actualIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ResultMapProps {
  guessLocation: Coordinates;
  actualLocation: Coordinates;
  actualLocationName: string;
}

export default function ResultMap({
  guessLocation,
  actualLocation,
  actualLocationName,
}: ResultMapProps) {
  // Calculate center between the two points
  const centerLat = (guessLocation.lat + actualLocation.lat) / 2;
  const centerLng = (guessLocation.lng + actualLocation.lng) / 2;

  return (
    <div className="result-map-container">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[guessLocation.lat, guessLocation.lng]} icon={guessIcon}>
          <Popup>Your guess</Popup>
        </Marker>
        <Marker position={[actualLocation.lat, actualLocation.lng]} icon={actualIcon}>
          <Popup>{actualLocationName}</Popup>
        </Marker>
        <Polyline
          positions={[
            [guessLocation.lat, guessLocation.lng],
            [actualLocation.lat, actualLocation.lng],
          ]}
          color="#e94560"
          weight={2}
          dashArray="10, 10"
        />
      </MapContainer>
      <div className="map-legend">
        <span className="legend-item">
          <span className="dot red"></span> Your guess
        </span>
        <span className="legend-item">
          <span className="dot green"></span> Actual location
        </span>
      </div>
    </div>
  );
}
