import type { ButtonStatus, Post, User } from "./Homepage";
import { TH, TD } from "./Table";

const Main = ({ users, posts, activeLink }: { users: User[]; posts: Post[]; activeLink: ButtonStatus }) => {
  return (
    <main className="flex gap-2 p-4 h-full">
      {activeLink === "posts" || (
        <div className="overflow-auto h-full">
          <table className="w-full table-fixed border-collapse text-sm">
            <caption className="caption-top">Users</caption>
            <thead>
              <tr>
                <TH>ID</TH>
                <TH>Name</TH>
                <TH>Username</TH>
                <TH>Email</TH>
                <TH>Interactions</TH>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <TD>{user.id}</TD>
                  <TD>{user.name}</TD>
                  <TD>{user.username}</TD>
                  <TD>{user.email}</TD>
                  <TD>
                    <button>VP</button>
                    <button>EU</button>
                    <button>DU</button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeLink === "users" || (
        <div className="overflow-auto h-full">
          <table className="w-full table-fixed border-collapse text-sm">
            <caption className="caption-top">Posts</caption>
            <thead>
              <tr>
                <TH>User ID</TH>
                <TH>Post ID</TH>
                <TH>Title</TH>
                <TH>User Name</TH>
                <TH>Interactions</TH>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <TD>{post.userId}</TD>
                  <TD>{post.id}</TD>
                  <TD>{post.title}</TD>
                  <TD>{users.find((user) => user.id === post.userId)?.name}</TD>
                  <TD>
                    <button>EP</button>
                    <button>DP</button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Main;
