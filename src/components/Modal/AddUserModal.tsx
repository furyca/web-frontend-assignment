import { useEffect, useState } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import type { User } from "../../store/types";
import { useRefContext } from "../RefContext";
import CloseButton from "../UI/CloseButton";
import SubmitButton from "../UI/SubmitButton";

export const AddUserModal = () => {
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", username: "", email: "" });
  const { addUserRef } = useRefContext();
  const { users, setUsers } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newID = Math.max(...users.map((u) => u.id)) + 1;
    if (newID < 0) {
      newID = 1;
    }
    const userExists = users.some((user) => user.email === newUser.email);
    if (userExists) {
      alert("User with this email already exists");
      return;
    }
    setUsers([...users, { ...newUser, id: newID }]);
    alert("User created");
    setActiveId(null);
    addUserRef.current?.close();
  };

  useEffect(() => {
    return () => {
      setNewUser({ id: 0, name: "", username: "", email: "" });
    };
  }, [activeId]);
  return (
    <dialog
      ref={addUserRef}
      className="backdrop:bg-black/50 h-3/5 w-2/5 bg-slate-900 text-gray-300 rounded"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleCreate} className="flex flex-col px-8 py-4">
        <h2 className="font-bold text-lg text-center mb-6">Add New User</h2>
        <div className="flex flex-col mb-6">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-2 border rounded"
            value={newUser.name}
            required
            minLength={1}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
            value={newUser.username}
            required
            minLength={1}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
            value={newUser.email}
            required
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        <div className="flex gap-2 mt-8">
          <CloseButton ref={addUserRef} />
          <SubmitButton />
        </div>
      </form>
    </dialog>
  );
};
