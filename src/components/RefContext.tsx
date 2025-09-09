import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

type RefContextType = {
  deleteUserRef: RefObject<HTMLDialogElement | null>;
  deletePostRef: RefObject<HTMLDialogElement | null>;
  editPostRef: RefObject<HTMLDialogElement | null>;
  editUserRef: RefObject<HTMLDialogElement | null>;
  addUserRef: RefObject<HTMLDialogElement | null>;
  addPostRef: RefObject<HTMLDialogElement | null>;
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
