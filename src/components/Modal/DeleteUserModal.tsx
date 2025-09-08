import { useEffect, useState } from "react";
import useInteractionStore from "../../store/interactionStore";
import useDataStore from "../../store/dataStore";
import { useRefContext } from "../RefContext";

export const DeleteUserModal = () => {
  const { deleteUserRef } = useRefContext();
  const { users, setUsers, setPosts, posts } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [username, setUsername] = useState<string | null>(null);

  const handleDelete = async () => {
    if (activeId) {
      setUsers(users.filter((u) => u.id !== activeId));
      setPosts(posts.filter((p) => p.userId !== activeId));
      alert("User deleted");
      deleteUserRef.current?.close();
      setActiveId(null);
    }
  };

  useEffect(() => {
    const user = users.find((u) => u.id === activeId);
    if (user) setUsername(user.username);

    return () => {
      setUsername(null);
    };
  }, [activeId]);

  return (
    <dialog
      ref={deleteUserRef}
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="bg-white text-black p-4 rounded-md flex flex-col justify-between">
        <h2>Delete {username}?</h2>
        <p>Are you sure you want to delete {username}?</p>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-red-600 rounded-md" onClick={handleDelete}>
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => deleteUserRef.current?.close()}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};