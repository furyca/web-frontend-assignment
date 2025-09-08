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

export type ButtonStatus = "users" | "posts" | "both" | "individual";
