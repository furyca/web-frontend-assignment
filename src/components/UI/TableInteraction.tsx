import type { ReactNode } from "react";

const TableInteraction = ({
  children,
  handleOperation,
  itemId,
}: {
  children: ReactNode;
  handleOperation: (id: number) => void;
  itemId: number;
}) => {
  return (
    <button
      onClick={() => handleOperation(itemId)}
      className="px-2 py-1 cursor-pointer rounded-sm bg-blue-950 hover:bg-blue-900 me-1 transition-all duration-200"
    >
      {children}
    </button>
  );
};

export default TableInteraction;
