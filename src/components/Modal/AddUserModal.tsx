import { useEffect, useState, type RefObject } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";
import type { User } from "../../store/types";

const AddUserModal = ({ addUserRef }: { addUserRef: RefObject<HTMLDialogElement | null> }) => {
  const { users, setUsers } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", username: "", email: "" });

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
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleCreate}>
        <p>Add New User</p>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          required
          minLength={1}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          required
          minLength={1}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          required
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => addUserRef.current?.close()}>
          Close
        </button>
      </form>
    </dialog>
  );
};

export default AddUserModal;
