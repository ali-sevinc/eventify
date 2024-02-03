import { ReactNode } from "react";

export default function InputContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 items-center justify-between">{children}</div>
  );
}
