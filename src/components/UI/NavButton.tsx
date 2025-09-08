import type { ReactNode } from "react";
import useDisplayStore from "../../store/displayStore";
import type { ButtonStatus } from "../../store/types";

const NavButton = ({
  children,
  getData,
  linkFor,
}: {
  children: ReactNode;
  getData: () => Promise<void>;
  linkFor: ButtonStatus;
}) => {
  const { activeLink, setActiveLink } = useDisplayStore();
  return (
    <button
      onClick={() => {
        setActiveLink(linkFor);
        getData && getData();
      }}
      className={`px-4 py-2 cursor-pointer rounded-sm ${
        linkFor === activeLink
          ? "bg-linear-[0deg,black_2%,transparent_12%,transparent] text-base font-bold"
          : "bg-linear-[0deg,white_2%,transparent_12%,transparent]"
      } `}
    >
      {children}
    </button>
  );
};

export default NavButton;
