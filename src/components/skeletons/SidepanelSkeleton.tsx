import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";
import CloseIcon from "/src/assets/closeIcon.svg?react";
import clsx from "clsx";

type Props = {
  isSidepanelOpen: boolean;
  setIsSidepanelOpen: (isOpen: boolean) => void;
};

export default function SidepanelSkeleton({
  isSidepanelOpen,
  setIsSidepanelOpen,
}: Props) {
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-90 shadow-xl bg-sidebar z-1001",
        isSidepanelOpen ? "translate-x-0" : "translate-x-100",
        "transition-transform duration-300",
      )}
    >
      <CloseIcon
        className="ml-2.5 mt-4 cursor-pointer"
        onClick={() => setIsSidepanelOpen(!isSidepanelOpen)}
      />

      <div className="flex flex-col gap-4 py-4 px-4">
        {/* "Air Pollution" heading */}
        <h1 className="text-2xl">Air Pollution</h1>

        {/* AQI number (text-5xl) */}
        <Skeleton className="h-12 w-16" />

        {/* "AQI" + info icon */}
        <div className="flex items-center gap-1">
          <h1 className="text-2xl">AQI</h1>
        </div>

        {/* 8 pollutant cards */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            childrenClassName="flex flex-col"
            className="from-sidebar-accent to-sidebar-accent/60"
          >
            {/* Pollutant name + value row */}
            <div className="flex justify-between mb-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-8" />
            </div>

            {/* Slider */}
            <Skeleton className="h-2 w-full rounded-full" />

            {/* Min / status / max row */}
            <div className="flex justify-between mt-2">
              <Skeleton className="h-3 w-4" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-8" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
