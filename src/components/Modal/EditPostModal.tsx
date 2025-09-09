import { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import { useRefContext } from "../RefContext";
import type { Post } from "../../store/types";
import CloseButton from "../UI/CloseButton";
import SubmitButton from "../UI/SubmitButton";

export const EditPostModal = () => {
  const { editPostRef } = useRefContext();
  const { users, posts, setPosts } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [post, setPost] = useState<Post>({ id: 0, title: "", userId: 0 });

  const handleEdit = async () => {
    if (activeId) {
      setPosts(posts.map((p) => (p.id === activeId ? { ...post } : p)));
    }
    alert("Changes saved");
    editPostRef.current?.close();
    setActiveId(null);
  };

  useEffect(() => {
    const post = posts.find((u) => u.id === activeId);
    if (post) setPost(post);

    return () => {
      setPost({ id: 0, title: "", userId: 0 });
    };
  }, [activeId]);
  return (
    <dialog
      ref={editPostRef}
      className="backdrop:bg-black/50 h-3/5 w-2/5 bg-slate-900 text-gray-300 rounded"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleEdit} className="flex flex-col px-8 py-4">
        <h2 className="font-bold text-lg text-center mb-8">Edit Post</h2>
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
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
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
            value={post.userId}
            onChange={(e) => setPost({ ...post, userId: Number(e.target.value) })}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-12">
          <CloseButton ref={editPostRef} />
          <SubmitButton />
        </div>
      </form>
    </dialog>
  );
};
