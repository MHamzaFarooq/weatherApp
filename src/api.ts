import { LocationSchema } from "./schemas/geoCodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";

export async function getWeatherData({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const resp = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
  );
  const data = await resp.json();
  return weatherSchema.parse(data);
}

export async function getCoordsForLocation(location: string) {
  const resp = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${import.meta.env.VITE_API_KEY}`,
  );
  const data = await resp.json();
  return LocationSchema.parse(data);
}
