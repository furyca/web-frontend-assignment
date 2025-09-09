import { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import type { Post } from "../../store/types";
import { useRefContext } from "../RefContext";
import SubmitButton from "../UI/SubmitButton";
import CloseButton from "../UI/CloseButton";

export const AddPostModal = () => {
  const { addPostRef } = useRefContext();
  const { users, posts, setPosts } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", userId: 0 });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newID = Math.max(...posts.map((u) => u.id)) + 1;
    if (newID < 0) {
      newID = 1;
    }
    setPosts([...posts, { ...newPost, id: newID }]);
    alert("Post created");
    addPostRef.current?.close();
    setActiveId(null);
  };

  useEffect(() => {
    return () => {
      setNewPost({ id: 0, title: "", userId: 0 });
    };
  }, [activeId]);
  return (
    <dialog
      ref={addPostRef}
      className="backdrop:bg-black/50 h-3/5 w-2/5 bg-slate-900 text-gray-300 rounded"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleCreate} className="flex flex-col px-8 py-4">
        <h2 className="font-bold text-lg text-center mb-8">Add New Post</h2>
        <div className="flex flex-col mb-16">
          <label htmlFor="title" className="mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Type here..."
            id="title"
            className="p-2 border rounded"
            required
            minLength={1}
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col mb-12">
          <label htmlFor="user" className="mb-2">
            User:
          </label>
          <select
            className="bg-slate-950 p-2 rounded"
            name="user"
            id="user-id"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-12">
          <CloseButton ref={addPostRef} />
          <SubmitButton />
        </div>
      </form>
    </dialog>
  );
};
