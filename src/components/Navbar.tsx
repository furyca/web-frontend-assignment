import NavButton from "./UI/NavButton";

const Navbar = ({ getData }: { getData: () => Promise<void> }) => {
  return (
    <nav className="flex items-center justify-center gap-8 p-6">
      <NavButton linkFor="users">Show Users</NavButton>
      <NavButton linkFor="posts">Show Posts</NavButton>
      <NavButton linkFor="both">Show Both</NavButton>
      <button className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer" onClick={getData}>
        Refresh
      </button>
    </nav>
  );
};

export default Navbar;
