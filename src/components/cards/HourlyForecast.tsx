import Card from "./Card";
import { getWeatherData } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeatherData({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Hourly Forecast (48 hours)"
      childrenClassName="flex gap-6 overflow-x-scroll"
    >
      {data?.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col items-center p-2">
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}

export default HourlyForecast;
