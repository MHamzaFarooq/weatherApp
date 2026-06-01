import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import Map from "./components/Map";
import type { Coords } from "./types";
import { Suspense, useState } from "react";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { getCoordsForLocation } from "./api";
import { useQuery } from "@tanstack/react-query";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import CurrentWeatherSkeleton from "./components/skeletons/CurrentWeatherSkeleton";
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton";
import HourlyForecastSkeleton from "./components/skeletons/HourlyForecastSkeleton";
import Sidepanel from "./components/Sidepanel";
import CloseIcon from "/src/assets/closeIcon.svg?react";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 22, lon: 72 });
  const [location, setLocation] = useState("Islamabad");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(true);

  const { data } = useQuery({
    queryKey: ["location", location],
    queryFn: () => getCoordsForLocation(location),
  });

  function onMapClick(lat: number, lon: number) {
    setCoordinates({ lat, lon });
    setLocation("custom");
  }

  const coords =
    location === "custom"
      ? coordinates
      : { lat: data?.[0].lat ?? 0, lon: data?.[0].lon ?? 0 };

  return (
    <>
      <div className="flex flex-col gap-4 w-full lg:w-[calc(100dvw-var(--sidebar-width))]">
        <div className="flex items-center justify-between px-4 pt-2">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Location:</p>
              <LocationDropdown location={location} setLocation={setLocation} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Map Type:</p>
              <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
            </div>
          </div>
          <CloseIcon
            className="rotate-180 cursor-pointer"
            onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
          />
        </div>
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        <Suspense fallback={<CurrentWeatherSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlyForecastSkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
      </div>
      <Sidepanel
        coords={coords}
        isSidepanelOpen={isSidepanelOpen}
        setIsSidepanelOpen={setIsSidepanelOpen}
      />
    </>
  );
}

export default App;
