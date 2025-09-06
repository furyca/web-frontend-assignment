import type { ReactNode } from "react";

const NavButton = ({
  children,
  active,
  handleActiveLink,
  getData,
}: {
  children: ReactNode;
  active: boolean;
  handleActiveLink: () => void;
  getData: () => Promise<void>;
}) => {
  return (
    <button
      onClick={() => {
        handleActiveLink();
        getData && getData();
      }}
      className={`px-4 py-2 cursor-pointer rounded-sm ${
        active
          ? "bg-linear-[0deg,black_2%,transparent_12%,transparent] text-base font-bold"
          : "bg-linear-[0deg,white_2%,transparent_12%,transparent]"
      } `}
    >
      {children}
    </button>
  );
};

export default NavButton;
