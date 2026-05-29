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
