import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";
import { useEffect } from "react";
type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

function Map({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      key={`${coords.lat},${coords.lon}`}
      center={[lat, lon]}
      zoom={5}
      //   scrollWheelZoom={false}
      style={{ width: "1000px", height: "1000px" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      <MapTileLayer />
      <TileLayer
        opacity={0.5}
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    onMapClick(lat, lng);
  });

  return null;
}
export default Map;

function MapTileLayer() {
  const map = useMap();
  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: "KlLQv7IdfN4ptj21Bz6Z",
    });
    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, []);

  return null;
}
