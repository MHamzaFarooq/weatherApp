import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
};

export default function Card({ children, title, childrenClassName }: Props) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 shadow-md">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
