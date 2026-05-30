import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";

function CurrentWeatherSkeleton() {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-5" // was gap-5, should be gap-6
    >
      {/* Temperature + Icon + Description */}
      <div className="flex flex-col items-center">
        <Skeleton className="h-16 w-32" /> {/* text-6xl temp */}
        <Skeleton className="size-14 mt-2" /> {/* WeatherIcon size-16 */}
        <Skeleton className="h-6 w-28 mt-1" /> {/* text-xl description */}
      </div>

      {/* Local Time */}
      <div className="flex flex-col">
        <p className="text-center">Local Time:</p>
        <Skeleton className="h-8 w-36 mt-1" /> {/* text-2xl time */}
      </div>

      {/* Stats row */}
      <div className="flex justify-between w-full">
        <div className="flex w-25 flex-col items-center gap-2">
          <p className="text-gray-500/45">Feels like</p>
          <Skeleton className="h-7 w-16" /> {/* text-xl value */}
        </div>
        <div className="flex w-25 flex-col items-center gap-2">
          <p className="text-gray-500/45">Humidity</p>
          <Skeleton className="h-7 w-16" />
        </div>
        <div className="flex w-25 flex-col items-center gap-2">
          <p className="text-gray-500/45">Wind Speed</p>
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
    </Card>
  );
}

export default CurrentWeatherSkeleton;
