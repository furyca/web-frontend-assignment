import UsersTable from "./Table/UsersTable";
import PostsTable from "./Table/PostsTable";

const Main = () => {
  return (
    <main className="flex flex-col lg:flex-row gap-2 p-4 h-[85%] w-full xl:w-4/5 mx-auto">
      <UsersTable />
      <PostsTable />
    </main>
  );
};

export default Main;
