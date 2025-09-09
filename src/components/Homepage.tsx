import { useEffect } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import useDataStore from "../store/dataStore";
import type { Post, User } from "../store/types";
import { RefProvider } from "./RefContext";
import { AddPostModal, AddUserModal, DeletePostModal, DeleteUserModal, EditPostModal, EditUserModal } from "./Modal";

const Homepage = () => {
  const { setUsers, setPosts } = useDataStore();
  useEffect(() => {
    getData();

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
  const getData = async () => {
    await getUsers();
    await getPosts();
  };
  return (
    <div className="h-full bg-stone-950 text-gray-300">
      <Navbar getData={getData} />
      <RefProvider>
        <Main />
        <DeleteUserModal />
        <DeletePostModal />
        <EditPostModal />
        <EditUserModal />
        <AddUserModal />
        <AddPostModal />
      </RefProvider>
    </div>
  );
};

export default Homepage;
