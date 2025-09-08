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
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className=" bg-white text-black p-4 rounded-md flex flex-col justify-between">
        <h2>Delete Post?</h2>
        <p>Are you sure you want to delete '{postname}'?</p>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-red-600 rounded-md" onClick={handleDelete}>
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => deletePostRef.current?.close()}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};