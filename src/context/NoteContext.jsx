import { createContext, useContext, useEffect, useState } from "react";
import API from "../hooks/api";

const NoteContext = createContext();

export function NoteContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [isGridView, setIsGridView] = useState(true);
  const [labels, setLabels] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteSearchTerm, setNoteSearchTerm] = useState("");
  const [labelFilterTerms, setLabelFilterTerms] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSortingLastModified, setIsSortingLastModified] = useState(true);
  const [selectedNoteItem, setSelectedNoteItem] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadDataError, setLoadDataError] = useState("");

  // Auth
  const login = (response = null, tokenData = null, userData = null) => {
    if (response) {
      setIsLoggedIn(true);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", response.data.user.id);
    } else {
      setIsLoggedIn(true);
      setToken(tokenData);
      setUserId(userData);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Note Actions
  const toggleGridListView = () => {
    setIsGridView((prev) => !prev);
  };

  const fetchNotes = async () => {
    try {
      setIsLoadingData(true);
      const res = await API.get("/notes");
      setNotes(res.data);
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);
      console.error("Fetch notes failed:", error);
      setLoadDataError("Fetch notes failed. Please try again later!");
    }
  };

  const addNote = async (noteItem, label_ids) => {
    const data = {
      userId: userId,
      noteTitle: noteItem.noteTitle,
      noteContent: noteItem.noteContent,
      isPinned: noteItem.isPinned,
      isLocked: noteItem.isLocked,
      notePassword: noteItem.notePassword,
      color: noteItem.color,
      fontSize: noteItem.fontSize,
      label_ids: label_ids,
    };

    const response = await API.post("/notes", data);
    await fetchNotes();
    // alert("Successfully added note!");

    return response.data;
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    await fetchNotes();
    alert("Successfully deleted note!");
  };

  const updateNote = async (id, noteItem, label_ids) => {
    const data = {
      userId: userId,
      noteTitle: noteItem.noteTitle,
      noteContent: noteItem.noteContent,
      isPinned: noteItem.isPinned,
      isLocked: noteItem.isLocked,
      notePassword: noteItem.notePassword,
      color: noteItem.color,
      fontSize: noteItem.fontSize,
      label_ids: label_ids || noteItem.labels.map((lb) => lb.id),
    };

    const response = await API.put(`/notes/${id}`, data);
    await fetchNotes();
    // alert("Successfully updated note!");

    return response.data.note;
  };

  // Label Actions
  const fetchLabels = async () => {
    try {
      const res = await API.get("/labels");
      setLabels(res.data);
    } catch (error) {
      console.error("Fetch labels failed:", error);
    }
  };

  const addLabel = async (name) => {
    await API.post("/labels", { labelName: name });
    await fetchLabels();
    alert("Successfully added tag!");
  };

  const deleteLabel = async (id) => {
    await API.delete(`/labels/${id}`);
    await fetchLabels();
    await fetchNotes();
    alert("Successfully deleted tag!");
  };

  const updateLabel = async (id, name) => {
    await API.put(`/labels/${id}`, { labelName: name });
    await fetchLabels();
    await fetchNotes();
    alert("Successfully updated tag!");
  };

  // useEffect
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchLabels();
      fetchNotes();
    }

    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const value = {
    toggleGridListView,
    isGridView,
    login,
    logout,
    isLoggedIn,
    token,
    labels,
    fetchLabels,
    addLabel,
    updateLabel,
    deleteLabel,
    notes,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
    noteSearchTerm,
    setNoteSearchTerm,
    isEditMode,
    setIsEditMode,
    labelFilterTerms,
    setLabelFilterTerms,
    isSortingLastModified,
    setIsSortingLastModified,
    selectedNoteItem,
    setSelectedNoteItem,
    isLoadingData,
    loadDataError,
    setIsLoadingData,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNote() {
  return useContext(NoteContext);
}
