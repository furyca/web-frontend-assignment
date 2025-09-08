import { TH, TD } from "./Table";
import TableInteraction from "./UI/TableInteraction";
import useDataStore from "../store/dataStore";
import useDisplayStore from "../store/displayStore";
import useInteractionStore from "../store/interactionStore";
import { useRefContext } from "./RefContext";

const Main = () => {
  const { deleteUserRef, editUserRef, addUserRef, deletePostRef, editPostRef, addPostRef } = useRefContext();
  const { users, posts, activeUser, setActiveUser } = useDataStore();
  const { activeLink, setActiveLink } = useDisplayStore();
  const { setActiveId } = useInteractionStore();

  const viewPosts = (id: number) => {
    setActiveUser(users.find((u) => u.id === id) || null);
    setActiveLink("individual");
  };
  const editUser = (id: number) => {
    setActiveId(id);
    editUserRef.current?.showModal();
  };
  const deleteUser = (id: number) => {
    setActiveId(id);
    deleteUserRef.current?.showModal();
  };
  const editPost = (id: number) => {
    setActiveId(id);
    editPostRef.current?.showModal();
  };
  const deletePost = (id: number) => {
    setActiveId(id);
    deletePostRef.current?.showModal();
  };
  const resetUsers = () => {
    setActiveUser(null);
    setActiveLink("both");
  };
  return (
    <main className="flex gap-2 p-4 h-[85%]">
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
                {activeLink !== "individual" && <TH>Interactions</TH>}
              </tr>
            </thead>
            <tbody>
              {activeUser ? (
                <tr key={activeUser.id}>
                  <TD>{activeUser.id}</TD>
                  <TD>{activeUser.name}</TD>
                  <TD>{activeUser.username}</TD>
                  <TD>{activeUser.email}</TD>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <TD>{user.id}</TD>
                    <TD>{user.name}</TD>
                    <TD>{user.username}</TD>
                    <TD>{user.email}</TD>
                    {activeLink !== "individual" && (
                      <TD>
                        <div className="text-end">
                          <TableInteraction itemId={user.id} handleOperation={viewPosts}>
                            VP
                          </TableInteraction>
                          <TableInteraction itemId={user.id} handleOperation={editUser}>
                            EU
                          </TableInteraction>
                          <TableInteraction itemId={user.id} handleOperation={deleteUser}>
                            DU
                          </TableInteraction>
                        </div>
                      </TD>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button className="cursor-pointer border p-2 rounded" onClick={() => addUserRef.current?.showModal()}>
            Add User
          </button>
          {activeLink === "individual" && (
            <button className="cursor-pointer border p-2 rounded" onClick={resetUsers}>
              All Users
            </button>
          )}
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
              {activeUser
                ? posts
                    .filter((post) => post.userId === activeUser.id)
                    .map((post) => (
                      <tr key={post.id}>
                        <TD>{post.userId}</TD>
                        <TD>{post.id}</TD>
                        <TD>{post.title}</TD>
                        <TD>{users.find((user) => user.id === post.userId)?.name}</TD>
                        <TD>
                          <div className="text-end">
                            <TableInteraction itemId={post.id} handleOperation={editPost}>
                              EP
                            </TableInteraction>
                            <TableInteraction itemId={post.id} handleOperation={deletePost}>
                              DP
                            </TableInteraction>
                          </div>
                        </TD>
                      </tr>
                    ))
                : posts.map((post) => (
                    <tr key={post.id}>
                      <TD>{post.userId}</TD>
                      <TD>{post.id}</TD>
                      <TD>{post.title}</TD>
                      <TD>{users.find((user) => user.id === post.userId)?.name}</TD>
                      <TD>
                        <div className="text-end">
                          <TableInteraction itemId={post.id} handleOperation={editPost}>
                            EP
                          </TableInteraction>
                          <TableInteraction itemId={post.id} handleOperation={deletePost}>
                            DP
                          </TableInteraction>
                        </div>
                      </TD>
                    </tr>
                  ))}
            </tbody>
          </table>
          <button className="cursor-pointer border p-2 rounded" onClick={() => addPostRef.current?.showModal()}>
            Add Post
          </button>
        </div>
      )}
    </main>
  );
};

export default Main;
