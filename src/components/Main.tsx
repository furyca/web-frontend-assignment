import { useState, type RefObject } from "react";
import { TH, TD } from "./Table";
import TableInteraction from "./UI/TableInteraction";
import useDataStore from "../store/dataStore";
import useDisplayStore from "../store/displayStore";
import useInteractionStore from "../store/interactionStore";
import type { Post, User } from "../store/types";

const Main = ({
  deleteUserRef,
  deletePostRef,
  editPostRef,
  editUserRef,
  addUserRef,
  addPostRef,
}: {
  deleteUserRef: RefObject<HTMLDialogElement | null>;
  deletePostRef: RefObject<HTMLDialogElement | null>;
  editPostRef: RefObject<HTMLDialogElement | null>;
  editUserRef: RefObject<HTMLDialogElement | null>;
  addUserRef: RefObject<HTMLDialogElement | null>;
  addPostRef: RefObject<HTMLDialogElement | null>;
}) => {
  const { users, posts, setUsers, setPosts } = useDataStore();
  const { activeLink, setActiveLink } = useDisplayStore();
  const { setActiveId } = useInteractionStore();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const viewPosts = async (id: number) => {
    setAllUsers(users);
    setAllPosts(posts);

    const user = users.filter((u) => u.id === id);
    setUsers(user);

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const data = await response.json();

    const filteredData = data.map(({ userId, id, title }: Post) => ({
      userId,
      id,
      title,
    }));
    
    setActiveLink("individual");
    setPosts(filteredData);
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
    setUsers(allUsers);
    setPosts(allPosts);
    setActiveLink("both");
  }
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
                </tr>
              ))}
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
              {posts.map((post) => (
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
