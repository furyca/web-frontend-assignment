import { useEffect, useState, type RefObject } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";

type NewUser = {
  name: string;
  username: string;
  email: string;
};

const EditUserModal = ({ editUserRef }: { editUserRef: RefObject<HTMLDialogElement | null> }) => {
  const { users, setUsers } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [username, setUsername] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({ name: "", username: "", email: "" });

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeId) {
      setUsers(users.map((u) => (u.id === activeId ? { ...u, ...newUser } : u)));
    }
    const userExists = users.some((user) => user.email === newUser.email);
    if (userExists) {
      alert("User with this email already exists");
      return;
    }
    alert("Changes saved");
    editUserRef.current?.close();
    setActiveId(null);
  };

  useEffect(() => {
    const user = users.find((u) => u.id === activeId);
    if (user) setUsername(user.name);

    return () => {
      setUsername(null);
      setNewUser({ name: "", username: "", email: "" });
    };
  }, [activeId]);
  return (
    <dialog
      ref={editUserRef}
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleEdit}>
        <p>Edit '{username}'</p>
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
        <button type="button" onClick={() => editUserRef.current?.close()}>
          Close
        </button>
      </form>
    </dialog>
  );
};

export default EditUserModal;
