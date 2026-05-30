import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";

function HourlyForecastSkeleton() {
  return (
    <Card
      title="Hourly Forecast (48 hours)"
      childrenClassName="flex gap-6 overflow-x-scroll"
    >
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center p-2">
          <Skeleton className="h-4 w-16" /> {/* time e.g. "12:00 PM" */}
          <Skeleton className="size-6 my-1" /> {/* WeatherIcon */}
          <Skeleton className="h-4 w-10" /> {/* temp */}
        </div>
      ))}
    </Card>
  );
}

export default HourlyForecastSkeleton;
