import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import DeleteUserModal from "./Modal/DeleteUserModal";
import useDataStore from "../store/dataStore";
import type { Post, User } from "../store/types";
import DeletePostModal from "./Modal/DeletePostModal";
import EditPostModal from "./Modal/EditPostModal";
import EditUserModal from "./Modal/EditUserModal";
import AddUserModal from "./Modal/AddUserModal";
import AddPostModal from "./Modal/AddPostModal";

const Homepage = () => {
  const { setUsers, setPosts } = useDataStore();
  const deleteUserRef = useRef<HTMLDialogElement | null>(null);
  const deletePostRef = useRef<HTMLDialogElement | null>(null);
  const editPostRef = useRef<HTMLDialogElement | null>(null);
  const editUserRef = useRef<HTMLDialogElement | null>(null);
  const addUserRef = useRef<HTMLDialogElement | null>(null);
  const addPostRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    getUsers();
    getPosts();

    return () => {
      setUsers([]);
      setPosts([]);
    };
  }, []);

  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const filteredData = data.map(({ id, name, username, email }: User) => ({
      id,
      name,
      username,
      email,
    }));
    setUsers(filteredData);
  };

  const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const filteredData = data.map(({ userId, id, title }: Post) => ({
      userId,
      id,
      title,
    }));
    setPosts(filteredData);
  };

  return (
    <div className="h-full">
      <Navbar getUsers={getUsers} getPosts={getPosts} />
      <Main
        deleteUserRef={deleteUserRef}
        deletePostRef={deletePostRef}
        editPostRef={editPostRef}
        editUserRef={editUserRef}
        addUserRef={addUserRef}
        addPostRef={addPostRef}
      />
      <DeleteUserModal deleteUserRef={deleteUserRef} />
      <DeletePostModal deletePostRef={deletePostRef} />
      <EditPostModal editPostRef={editPostRef} />
      <EditUserModal editUserRef={editUserRef} />
      <AddUserModal addUserRef={addUserRef} />
      <AddPostModal addPostRef={addPostRef} />
    </div>
  );
};

export default Homepage;
