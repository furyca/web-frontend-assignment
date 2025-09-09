import { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import { useRefContext } from "../RefContext";

export const DeletePostModal = () => {
  const [postname, setPostname] = useState<string | null>(null);
  const { deletePostRef } = useRefContext();
  const { posts, setPosts } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();

  const handleDelete = async () => {
    if (activeId) {
      setPosts(posts.filter((p) => p.id !== activeId));
    }
    alert("Post deleted");
    deletePostRef.current?.close();
    setActiveId(null);
  };
  useEffect(() => {
    const post = posts.find((p) => p.id === activeId);
    if (post) setPostname(post.title);

    return () => {
      setPostname(null);
    };
  }, [activeId]);
  return (
    <dialog
      ref={deletePostRef}
      className="backdrop:bg-black/50 h-1/4 w-1/4 rounded bg-slate-300 text-black"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="p-4 rounded-md flex flex-col justify-between h-full">
        <h2 className="font-bold text-xl text-center">Delete Post?</h2>
        <p className="text-sm">Are you sure you want to delete '{postname}'?</p>
        <div className="flex justify-end gap-4">
          <button
            className="cursor-pointer p-2 px-3 w-full rounded bg-red-900 hover:bg-red-950 text-gray-300 text-sm font-semibold transition-all duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="cursor-pointer p-2 px-3 w-full rounded bg-gray-700 hover:bg-gray-900 text-gray-300 text-sm font-semibold transition-all duration-200"
            onClick={() => deletePostRef.current?.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};