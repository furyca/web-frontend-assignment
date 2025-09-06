import type { ReactNode } from "react";

export const TH = ({ children }: { children: ReactNode }) => {
  return (
    <th className="border border-gray-200 bg-gray-50 p-1 text-left font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
      {children}
    </th>
  );
};

export const TD = ({ children }: { children: ReactNode }) => {
  return (
    <td className="border border-gray-300 bg-white p-1 text-left text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
      {children}
    </td>
  );
};
