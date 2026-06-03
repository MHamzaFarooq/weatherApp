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
import clsx from "clsx";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 22, lon: 72 });
  const [location, setLocation] = useState("Islamabad");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(() => true);

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
      : data?.[0]
        ? { lat: data[0].lat, lon: data[0].lon }
        : coordinates; // fallback to last known good position

  return (
    <>
      <div className="flex flex-col p-4 gap-4 w-full lg:w-[calc(100%-var(--sidebar-width))]">
        <div className="flex flex-col-reverse justify-between items-center sm:flex-row">
          <div className="flex flex-col w-full sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col w-full sm:w-fit sm:flex-row items-start sm:items-center gap-2">
              <p className="text-sm text-muted-foreground">Location:</p>
              <LocationDropdown location={location} setLocation={setLocation} />
            </div>
            <div className="flex flex-col w-full sm:w-fit sm:flex-row items-start sm:items-center gap-2">
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                Map Type:
              </p>
              <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
            </div>
          </div>
          <div className="h-6 ml-auto lg:hidden">
            <CloseIcon
              className={clsx(
                "rotate-180 cursor-pointer lg:hidden ml-auto",
                isSidepanelOpen && "hidden",
              )}
              onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
            />
          </div>
        </div>
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-1">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<HourlyForecastSkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
        </div>
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
