import { useEffect, useState, type RefObject } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import type { Post } from "../../store/types";

const AddPostModal = ({ addPostRef }: { addPostRef: RefObject<HTMLDialogElement | null> }) => {
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
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleCreate}>
        <p>Add New Post</p>
        <input
          type="text"
          placeholder="Title"
          required
          minLength={1}
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <label htmlFor="user">User:</label>
        <select
          className="bg-black"
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
        <button type="submit">
          Save
        </button>
        <button type="button" onClick={() => addPostRef.current?.close()}>
          Close
        </button>
      </form>
    </dialog>
  );
};

export default AddPostModal;
