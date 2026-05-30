import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";

function DailyForecastSkeleton() {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-9" /> {/* weekday */}
          <Skeleton className="size-6" /> {/* WeatherIcon */}
          <Skeleton className="h-4 w-10" /> {/* day temp */}
          <Skeleton className="h-4 w-10" /> {/* min temp */}
          <Skeleton className="h-4 w-10" /> {/* max temp */}
        </div>
      ))}
    </Card>
  );
}

export default DailyForecastSkeleton;
