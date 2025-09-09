import type { ReactNode } from "react";

const Button = ({ handleClick, children }: { handleClick: () => void; children: ReactNode }) => {
  return (
    <button
      className="cursor-pointer p-2 px-3 rounded bg-blue-900 hover:bg-blue-950 text-sm font-semibold transition-all duration-200"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
