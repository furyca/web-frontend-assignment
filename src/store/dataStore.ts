import { create } from "zustand";
import type { Post, User } from "./types";

type DataState = {
  users: User[];
  setUsers: (users: User[]) => void;
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};
const useDataStore = create<DataState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  activeUser: null,
  setActiveUser: (user) => set({ activeUser: user }),
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

export default useDataStore;
