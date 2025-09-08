import { createContext, useContext, useRef, type ReactNode } from "react";

type RefContextType = {
  deleteUserRef: React.RefObject<HTMLDialogElement | null>;
  deletePostRef: React.RefObject<HTMLDialogElement | null>;
  editPostRef: React.RefObject<HTMLDialogElement | null>;
  editUserRef: React.RefObject<HTMLDialogElement | null>;
  addUserRef: React.RefObject<HTMLDialogElement | null>;
  addPostRef: React.RefObject<HTMLDialogElement | null>;
};

const RefContext = createContext<RefContextType | null>(null);

export const RefProvider = ({ children }: { children: ReactNode }) => {
  const deleteUserRef = useRef<HTMLDialogElement | null>(null);
  const deletePostRef = useRef<HTMLDialogElement | null>(null);
  const editPostRef = useRef<HTMLDialogElement | null>(null);
  const editUserRef = useRef<HTMLDialogElement | null>(null);
  const addUserRef = useRef<HTMLDialogElement | null>(null);
  const addPostRef = useRef<HTMLDialogElement | null>(null);

  const value: RefContextType = {
    deleteUserRef,
    deletePostRef,
    editPostRef,
    editUserRef,
    addUserRef,
    addPostRef,
  };

  return <RefContext value={value}>{children}</RefContext>;
};

export const useRefContext = () => {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error("useRefContext must be used within a RefProvider");
  }
  return context;
};
