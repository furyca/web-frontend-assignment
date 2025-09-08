import NavButton from "./UI/NavButton";

const Navbar = ({ getUsers, getPosts }: { getUsers: () => Promise<void>; getPosts: () => Promise<void> }) => {
  const getBoth = async () => {
    await getUsers();
    await getPosts();
  };
  return (
    <nav className="flex items-center justify-center gap-8 p-6">
      <NavButton linkFor='users' getData={getUsers}>Show Users</NavButton>
      <NavButton linkFor='posts' getData={getPosts}>Show Posts</NavButton>
      <NavButton linkFor='both' getData={getBoth}>Show Both</NavButton>
    </nav>
  );
};

export default Navbar;
