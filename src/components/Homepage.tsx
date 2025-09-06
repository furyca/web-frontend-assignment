import Main from "./Main";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
export type Post = {
  userId: number;
  id: number;
  title: string;
};

export type ButtonStatus = "users" | "posts" | "both";

const Homepage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeLink, setActiveLink] = useState<ButtonStatus>("both");

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
      <Navbar active={activeLink} handleActiveLink={setActiveLink} getUsers={getUsers} getPosts={getPosts} />
      <Main users={users} posts={posts} activeLink={activeLink} />
    </div>
  );
};

export default Homepage;
