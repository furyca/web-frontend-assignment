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
      className="backdrop:bg-black/50 h-1/4 w-1/4 rounded bg-slate-300 text-black"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="p-4 rounded-md flex flex-col justify-between h-full">
        <h2 className="font-bold text-xl text-center">Delete User?</h2>
        <p className="text-sm">Are you sure you want to delete {username}?</p>
        <div className="flex justify-end gap-4">
          <button
            className="cursor-pointer p-2 px-3 w-full rounded bg-red-900 hover:bg-red-950 text-gray-300 text-sm font-semibold transition-all duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="cursor-pointer p-2 px-3 w-full rounded bg-gray-700 hover:bg-gray-900 text-gray-300 text-sm font-semibold transition-all duration-200"
            onClick={() => deleteUserRef.current?.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
