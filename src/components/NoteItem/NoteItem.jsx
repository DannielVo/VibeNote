import React, { useEffect, useRef, useState } from "react";
import "./noteItem.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import NotePasswordModal from "../NotePasswordModal/NotePasswordModal";
import { useNote } from "../../context/NoteContext";

const NoteItem = ({ noteItem }) => {
  const { updateNote, selectedNoteItem, setSelectedNoteItem, setIsEditMode } =
    useNote();

  const [isNoteMenuOpen, setIsNoteMenuOpen] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const noteMenuRef = useRef(null);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [loadingLock, setLoadingLock] = useState(false);
  const [loadingChangePass, setLoadingChangePass] = useState(false);
  const [loadingLoadEditMode, setLoadingLoadEditMode] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    action: "", // "set", "enter", or "change"
    noteItem: null,
    onSuccess: () => {},
    onCancel: () => {},
  });

  const openPasswordModal = (action) => {
    return new Promise((resolve, reject) => {
      setModalConfig({
        isOpen: true,
        action: action, // "set" | "enter" | "change"
        noteItem: noteItem, // note hiện tại
        onSuccess: (password) => {
          resolve(password);
          closePasswordModal();
        },
        onCancel: () => {
          reject("cancel");
          closePasswordModal();
        },
      });
    });
  };

  const closePasswordModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const togglePinnedIcon = async () => {
    try {
      setLoadingSpin(true);
      let newVal = !noteItem.isPinned;
      let tempNote = { ...noteItem, isPinned: newVal };
      await updateNote(noteItem.id, tempNote);
      noteItem.isPinned = newVal;
      setLoadingSpin(false);
      setIsNoteMenuOpen(false);
    } catch (error) {
      console.log(error);
      setLoadingSpin(false);
      alert("Something went wrong. Please try again later!");
    }
  };

  const toggleLockedIcon = async () => {
    try {
      setIsInProgress(true);
      setLoadingLock(true);
      const password = await openPasswordModal(
        noteItem.isLocked ? "enter" : "set"
      );

      try {
        let tempNote = {};
        if (noteItem.isLocked) {
          // Unlocked successfully
          tempNote = { ...noteItem, isLocked: false, notePassword: "" };
        } else {
          // Set password successfully
          tempNote = { ...noteItem, isLocked: true, notePassword: password };
        }
        await updateNote(noteItem.id, tempNote);
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again later!");
      }

      setLoadingLock(false);
      setIsInProgress(false);
      setIsNoteMenuOpen(false);
    } catch (e) {
      setLoadingLock(false);
      setIsInProgress(false);
      console.log("User cancelled or failed password", e);
    }
  };

  const changeLockPassword = async () => {
    try {
      setLoadingChangePass(true);
      setIsInProgress(true);
      const password = await openPasswordModal("change");

      try {
        let tempNote = { ...noteItem, isLocked: true, notePassword: password };
        await updateNote(noteItem.id, tempNote);
      } catch (error) {
        console.log(error);
        setLoadingSpin(false);
        alert("Something went wrong. Please try again later!");
      }

      setLoadingChangePass(false);
      setIsInProgress(false);
      setIsNoteMenuOpen(false);
    } catch (error) {
      setLoadingChangePass(false);
      setIsInProgress(false);
      console.log("User cancelled or failed password", e);
    }
  };

  const toggleNoteMenu = () => {
    setIsNoteMenuOpen((prev) => !prev);
  };

  const handleClickNoteItem = async () => {
    try {
      setIsInProgress(true);
      setLoadingLoadEditMode(true);

      if (noteItem.isLocked) {
        const password = await openPasswordModal("enter");
      }

      setSelectedNoteItem(noteItem);

      setLoadingLoadEditMode(false);
      setIsInProgress(false);
      setIsNoteMenuOpen(false);
    } catch (e) {
      setLoadingLoadEditMode(false);
      setIsInProgress(false);
      console.log("User cancelled or failed password", e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isNoteMenuOpen &&
        !isInProgress &&
        noteMenuRef.current &&
        !noteMenuRef.current.contains(e.target)
      ) {
        setIsNoteMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNoteMenuOpen, isInProgress]);

  return (
    <>
      <div
        className={`note-card ${noteItem.isLocked ? "locked-note" : ""}`}
        style={noteItem.color ? { backgroundColor: noteItem.color } : {}}
        onClick={handleClickNoteItem}
      >
        {noteItem.isLocked ? (
          <>
            <i className="bx bx-lock locked-note-icon"></i>
            {loadingLoadEditMode && (
              <div className="note-menu-spinner lock-style"></div>
            )}
            <div className="note-options">
              <i
                className="bx bx-dots-vertical-rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNoteMenu();
                }}
              ></i>
            </div>
          </>
        ) : (
          <>
            <h3 className="note-card-title">{noteItem.noteTitle}</h3>
            <div className="note-labels">
              {noteItem.labels.map((item, index) => (
                <span
                  className="note-card-labels"
                  key={`label-note-item ${noteItem.id} ${index}`}
                >
                  {item.labelName}
                </span>
              ))}
            </div>
            <p className="note-card-content">{noteItem.noteContent}</p>
            <div className="note-options">
              <i
                className="bx bx-dots-vertical-rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNoteMenu();
                }}
              ></i>
            </div>
          </>
        )}

        {/* Popup note options */}
        {isNoteMenuOpen && (
          <div className="note-menu" ref={noteMenuRef}>
            <div
              className="menu-item"
              onClick={(e) => {
                e.stopPropagation();
                togglePinnedIcon();
              }}
            >
              <i
                className={`bx ${
                  noteItem.isPinned ? "bx-pin-slash-alt" : "bx-pin"
                }`}
              ></i>{" "}
              {noteItem.isPinned ? "Unpin" : "Pin"}
              {loadingSpin && <div className="note-menu-spinner"></div>}
            </div>

            <div
              className="menu-item"
              onClick={(e) => {
                handleClickNoteItem();
              }}
            >
              <i className="bx bx-edit editNote-icon"></i> Edit{" "}
              {loadingLoadEditMode && <div className="note-menu-spinner"></div>}
            </div>
            <div className="menu-item">
              <i className="bx bx-share"></i> Share
            </div>
            {!noteItem.isLocked ? (
              <div
                className="menu-item"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLockedIcon();
                }}
              >
                <i className="bx bx-lock"></i> Lock
                {loadingLock && <div className="note-menu-spinner"></div>}
              </div>
            ) : (
              <>
                <div
                  className="menu-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLockedIcon();
                  }}
                >
                  <i className="bx bx-lock-open-alt"></i> Unlock{" "}
                  {loadingLock && <div className="note-menu-spinner"></div>}
                </div>
                <div
                  className="menu-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLockPassword();
                  }}
                >
                  <i className="bx bx-key"></i> Change password{" "}
                  {loadingChangePass && (
                    <div className="note-menu-spinner"></div>
                  )}
                </div>
              </>
            )}

            <div
              className="menu-item deleteNote-icon"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal();
              }}
            >
              <i className="bx bx-trash"></i> Delete
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemType={"note"}
        itemName={"note"}
        itemId={noteItem.id}
      ></DeleteConfirmModal>

      <NotePasswordModal
        isOpen={modalConfig.isOpen}
        onClose={modalConfig.onCancel}
        noteItem={modalConfig.noteItem}
        action={modalConfig.action}
        onSuccess={modalConfig.onSuccess}
        onCancel={modalConfig.onCancel}
      />
    </>
  );
};

export default NoteItem;
