import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import Map from "./components/Map";
import type { Coords } from "./types";
import { useState } from "react";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 22, lon: 72 });
  function onMapClick(lat: number, lon: number) {
    setCoords({ lat, lon });
  }
  return (
    <div className="flex flex-col gap-4">
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
    </div>
  );
}

export default App;
