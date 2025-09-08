import { useEffect, useState, type RefObject } from "react";
import useDataStore from "../../store/dataStore";
import useInteractionStore from "../../store/interactionStore";

const EditPostModal = ({ editPostRef }: { editPostRef: RefObject<HTMLDialogElement | null> }) => {
  const { posts, setPosts } = useDataStore();
  const { activeId, setActiveId } = useInteractionStore();
  const [postname, setPostname] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');

  const handleEdit = async () => {
    if (activeId) {
      setPosts(posts.map((p) => (p.id === activeId ? { ...p, title } : p)));
    }
    alert("Changes saved");
    editPostRef.current?.close();
    setActiveId(null);
  };

  useEffect(() => {
    const post = posts.find((u) => u.id === activeId);
    if (post) setPostname(post.title);

    return () => {
      setPostname(null);
      setTitle('');
    };
  }, [activeId]);
  return (
    <dialog
      ref={editPostRef}
      className="backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <form method="dialog" onSubmit={handleEdit}>
        <p>Edit '{postname}'</p>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">
          Save
        </button>
        <button type="button" onClick={() => editPostRef.current?.close()}>
          Close
        </button>
      </form>
    </dialog>
  );
};

export default EditPostModal;
