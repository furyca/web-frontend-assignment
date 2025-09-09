import type { ReactNode } from "react";
import useDisplayStore from "../../store/displayStore";
import type { ButtonStatus } from "../../store/types";

const NavButton = ({ children, linkFor }: { children: ReactNode; linkFor: ButtonStatus }) => {
  const { activeLink, setActiveLink } = useDisplayStore();
  return (
    <button
      onClick={() => {
        setActiveLink(linkFor);
      }}
      className={`px-4 py-2 w-24 cursor-pointer rounded-sm transition-all ease-initial duration-300 ${
        linkFor === activeLink
          ? "bg-linear-[0deg,white_2%,transparent_8%,transparent] text-base font-bold"
          : "bg-linear-[0deg,teal_2%,transparent_8%,transparent]"
      } `}
    >
      {children}
    </button>
  );
};

export default NavButton;
