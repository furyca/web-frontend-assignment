import type { RefObject } from "react";

const CloseButton = ({ ref }: { ref: RefObject<HTMLDialogElement | null> }) => {
  return (
    <button
      type="button"
      className="cursor-pointer p-2 px-3 w-full rounded bg-red-900 hover:bg-red-950 text-sm font-semibold transition-all duration-200"
      onClick={() => ref.current?.close()}
    >
      Close
    </button>
  );
};

export default CloseButton;
