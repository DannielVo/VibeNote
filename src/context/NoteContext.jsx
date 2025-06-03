import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export function NoteContextProvider({ children }) {
  const [isGridView, setIsGridView] = useState(true);

  const toggleGridListView = () => {
    setIsGridView((prev) => !prev);
  };

  const value = { toggleGridListView, isGridView };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNote() {
  return useContext(NoteContext);
}
