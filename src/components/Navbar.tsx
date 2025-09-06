import type { ButtonStatus } from "./Homepage";
import NavButton from "./UI/NavButton";

const Navbar = ({
  active,
  handleActiveLink,
  getUsers,
  getPosts,
}: {
  active: ButtonStatus;
  handleActiveLink: (value: ButtonStatus) => void;
  getUsers: () => Promise<void>;
  getPosts: () => Promise<void>;
}) => {
  const getBoth = async () => {
    await getUsers();
    await getPosts();
  };
  return (
    <nav className="flex items-center justify-center gap-8 p-6">
      <NavButton active={active === "users"} handleActiveLink={() => handleActiveLink("users")} getData={getUsers}>
        Show Users
      </NavButton>
      <NavButton active={active === "posts"} handleActiveLink={() => handleActiveLink("posts")} getData={getPosts}>
        Show Posts
      </NavButton>
      <NavButton active={active === "both"} handleActiveLink={() => handleActiveLink("both")} getData={getBoth}>
        Show Both
      </NavButton>
    </nav>
  );
};

export default Navbar;
