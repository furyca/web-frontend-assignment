import type { ReactNode } from "react";

export const TH = ({ children }: { children: ReactNode }) => {
  return (
    <th className="border truncate p-1 text-left font-medium border-slate-800 bg-slate-900">
      {children}
    </th>
  );
};

export const TD = ({ children }: { children: ReactNode }) => {
  return (
    <td className="border group-hover:bg-sky-900 truncate p-1 text-left border-slate-800 bg-stone-950">
      {children}
    </td>
  );
};