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
    <button onClick={() => handleOperation(itemId)} className="px-2 py-1 cursor-pointer rounded-sm bg-sky-900 me-1">
      {children}
    </button>
  );
};

export default TableInteraction;
