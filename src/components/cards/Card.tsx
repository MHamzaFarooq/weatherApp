import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
  return (
    <div className="p-4 rounded-xl bg-card bg-linear-to-br from-card to-card/60 shadow-md">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
