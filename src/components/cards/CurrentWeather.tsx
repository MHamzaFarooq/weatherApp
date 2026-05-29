import { getWeatherData } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeatherData({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-6xl">{Math.round(data?.current?.temp)}°C</h2>
        <WeatherIcon className="size-16" src={data?.current?.weather[0].icon} />
        <h3 className="text-xl capitalize">
          {data?.current?.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col">
        <p className="text-center">Local Time:</p>
        <h3 className="text-2xl text-center">
          {new Intl.DateTimeFormat("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data?.timezone,
          }).format(new Date(data?.current?.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500/45">Feels like</p>
          <p className="text-xl">{Math.round(data?.current?.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500/45">Humidity</p>
          <p className="text-xl">{Math.round(data?.current?.humidity)}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500/45">Wind Speed</p>
          <p className="text-xl">{Math.round(data?.current?.wind_speed)} m/s</p>
        </div>
      </div>
    </Card>
  );
}

export default CurrentWeather;
