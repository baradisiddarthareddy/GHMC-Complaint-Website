import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";

// 🔹 Helper component to move map view when new coordinates are set
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15); // Smoothly move to new position
    }
  }, [lat, lng, map]);
  return null;
}

export default function LocationPicker({ onSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  }

  // 🟢 Update local position if initialPosition prop changes
  useEffect(() => {
    if (initialPosition?.lat && initialPosition?.lng) {
      setPosition(initialPosition);
      onSelect(initialPosition);
    }
  }, [initialPosition]);

  return (
    <div className="mt-3 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span>Click on the map to set your location</span>
        {position && (
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </span>
        )}
      </div>

      <MapContainer
        center={position ? [position.lat, position.lng] : [17.385, 78.486]} // Default: Hyderabad
        zoom={13}
        scrollWheelZoom={true}
        className="h-64 w-full rounded-b-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {/* 🟢 Automatically re-center when initialPosition changes */}
        {position && <RecenterMap lat={position.lat} lng={position.lng} />}
        <LocationMarker />
      </MapContainer>

      {position && (
        <div className="p-2 text-sm text-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
          📍 Selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
