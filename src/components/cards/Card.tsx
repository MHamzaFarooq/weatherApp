import { type ReactNode } from "react";
import clsx from "clsx";
type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl bg-card bg-linear-to-br from-card to-card/60 shadow-md",
        className,
      )}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
