import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import Card from "./cards/Card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InfoIcon from "/src/assets/infroIcon.svg?react";
import CloseIcon from "/src/assets/closeIcon.svg?react";
import clsx from "clsx";
import SidepanelSkeleton from "./skeletons/SidepanelSkeleton";

type Props = {
  coords: {
    lat: number;
    lon: number;
  };
  isSidepanelOpen: boolean;
  setIsSidepanelOpen: (isOpen: boolean) => void;
};

export default function Sidepanel(props: Props) {
  const { isSidepanelOpen, setIsSidepanelOpen } = props;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-xl bg-sidebar z-1001 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!",
        isSidepanelOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <CloseIcon
        className={clsx("ml-2.5 mt-4 cursor-pointer", "lg:hidden")}
        onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
      />
      <Suspense
        fallback={
          <SidepanelSkeleton
            isSidepanelOpen={isSidepanelOpen}
            // setIsSidepanelOpen={setIsSidepanelOpen}
          />
        }
      >
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["airPollution", coords],
    queryFn: () => getAirPollution(coords),
  });
  return (
    <div className="flex flex-col gap-4 py-4 px-4">
      <h1 className="text-2xl">Air Pollution</h1>
      <h1 className="text-5xl">{data.list[0]?.main.aqi}</h1>
      <div className="flex items-center gap-1">
        <h1 className="text-2xl">AQI</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-5 invert" />
            </TooltipTrigger>
            <TooltipContent className="z-1002">
              <p>
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutant =
          airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];
        const max = pollutant["Very Poor"].min;
        const currentStatus = (() => {
          for (const [status, range] of Object.entries(pollutant)) {
            if (
              value >= range.min &&
              (range.max === null || value <= range.max)
            ) {
              return status;
            }
          }
        })();
        const pollutantName = Object.entries(pollutantNameMapping).find(
          ([pollutantKey]) => pollutantKey === key.toUpperCase(),
        )?.[1];

        return (
          <Card
            childrenClassName="flex flex-col"
            key={key}
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
          >
            <div className="flex justify-between mb-3">
              <span>{pollutantName}</span>
              <span>{value}</span>
            </div>
            <Slider disabled value={[value]} max={max} min={0} step={1} />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground w-20">0</span>
              <span className="text-sm">{currentStatus}</span>
              <span className="text-sm text-muted-foreground w-20 text-right">
                {max}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};
