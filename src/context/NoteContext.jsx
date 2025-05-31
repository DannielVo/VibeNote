import { createContext, useContext } from "react";

const NoteContext = createContext();

export function NoteContextProvider({ children }) {
  const value = {};
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNote() {
  return useContext(NoteContext);
}
