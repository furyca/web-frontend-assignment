import { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import { useRefContext } from "../RefContext";
import CloseButton from "../UI/CloseButton";
import SubmitButton from "../UI/SubmitButton";
import type { User } from "../../store/types";

export const EditUserModal = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<User>({ id: 0, name: "", username: "", email: "" });
  const { editUserRef } = useRefContext();
  const { users, setUsers } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userExists = users.filter((u) => u.id !== user.id).some((u) => u.email === user.email);
    if (userExists) {
      alert("User with this email already exists");
      return;
    }
    if (activeId) {
      setUsers(users.map((u) => (u.id === activeId ? { ...u, ...user } : u)));
    }
    alert("Changes saved");
    editUserRef.current?.close();
    setActiveId(null);
  };

  useEffect(() => {
    const user = users.find((u) => u.id === activeId);
    if (user) setUser(user);

    return () => {
      setUsername(null);
      setUser({ id: 0, name: "", username: "", email: "" });
    };
  }, [activeId]);
  return (
    <dialog
      ref={editUserRef}
      className="backdrop:bg-black/50 h-3/5 w-2/5 bg-slate-900 text-gray-300 rounded"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleEdit} className="flex flex-col px-8 py-4">
        <h2 className="font-bold text-lg text-center mb-6">Edit '{username}'</h2>
        <div className="flex flex-col mb-6">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-2 border rounded"
            value={user.name}
            required
            minLength={1}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="p-2 border rounded"
            value={user.username}
            required
            minLength={1}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="p-2 border rounded"
            value={user.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex gap-2 mt-8">
          <CloseButton ref={editUserRef} />
          <SubmitButton />
        </div>
      </form>
    </dialog>
  );
};
