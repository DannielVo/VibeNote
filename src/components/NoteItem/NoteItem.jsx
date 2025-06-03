import React, { useState } from "react";
import "./noteItem.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import NotePasswordModal from "../NotePasswordModal/NotePasswordModal";

const NoteItem = ({ noteItem }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isNoteMenuOpen, setIsNoteMenuOpen] = useState(false);
  const [isLockedIconOpen, setIsLockedIconOpen] = useState(true);
  const [isPinnedIconOpen, setIsPinnedIconOpen] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedPassAction, setSelectedPassAction] = useState("");

  const openPasswordModal = (action) => {
    setSelectedPassAction(action);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const togglePinnedIcon = () => {
    setIsPinnedIconOpen((prev) => !prev);
  };

  const toggleLockedIcon = () => {
    if (isLockedIconOpen) {
      // Note lúc này chưa khóa => Cần khóa lại
      // TODO: Hiện modal set password cho note + Khóa note lại
      setIsLocked(true);
    } else {
      // Note lúc này đã khóa => Cần mở
      // TODO: Hiện modal xác nhận password trc khi mở khóa + Mở note ra => Note trở lại UI bình thường
      setIsLocked(false);
    }
    setIsLockedIconOpen((prev) => !prev);
  };

  const toggleNoteMenu = () => {
    setIsNoteMenuOpen((prev) => !prev);
  };
  return (
    <>
      <div className={`note-card ${isLocked ? "locked-note" : ""} `}>
        {isLocked ? (
          <>
            <i className="bx bx-lock locked-note-icon"></i>
            <div className="note-options">
              <i
                className="bx bx-dots-vertical-rounded"
                onClick={toggleNoteMenu}
              ></i>
            </div>
          </>
        ) : (
          <>
            <h3 className="note-card-title">{noteItem.noteTitle}</h3>
            <div className="note-labels">
              <span className="note-card-labels">Work</span>
              <span className="note-card-labels">Project</span>
              <span className="note-card-labels">Ideas</span>
            </div>
            <p className="note-card-content">{noteItem.noteContent}</p>
            <div className="note-options">
              <i
                className="bx bx-dots-vertical-rounded"
                onClick={toggleNoteMenu}
              ></i>
            </div>
          </>
        )}

        {/* Popup note options */}
        {isNoteMenuOpen && (
          <div className="note-menu">
            {isPinnedIconOpen ? (
              <div className="menu-item" onClick={togglePinnedIcon}>
                <i className="bx bx-pin"></i> Pin
              </div>
            ) : (
              <div className="menu-item" onClick={togglePinnedIcon}>
                <i className="bx bx-pin-slash-alt"></i> Unpin
              </div>
            )}

            <div className="menu-item">
              <i className="bx bx-edit editNote-icon"></i> Edit
            </div>
            <div className="menu-item">
              <i className="bx bx-share"></i> Share
            </div>
            {isLockedIconOpen ? (
              <div
                className="menu-item"
                onClick={() => {
                  toggleLockedIcon();
                  openPasswordModal("set");
                }}
              >
                <i className="bx bx-lock"></i> Lock
              </div>
            ) : (
              <>
                <div
                  className="menu-item"
                  onClick={() => {
                    toggleLockedIcon();
                    openPasswordModal("enter");
                  }}
                >
                  <i className="bx bx-lock-open-alt"></i> Unlock
                </div>
                <div
                  className="menu-item"
                  onClick={() => {
                    toggleLockedIcon();
                    openPasswordModal("change");
                  }}
                >
                  <i className="bx bx-key"></i> Change password
                </div>
              </>
            )}

            <div
              className="menu-item deleteNote-icon"
              onClick={openDeleteModal}
            >
              <i className="bx bx-trash"></i> Delete
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemName={"note"}
      ></DeleteConfirmModal>

      <NotePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        noteItem={{}}
        action={selectedPassAction}
      ></NotePasswordModal>
    </>
  );
};

export default NoteItem;
