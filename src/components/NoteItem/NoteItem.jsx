import React, { useState } from "react";
import "./noteItem.css";

const NoteItem = () => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <>
      {isLocked ? (
        <div className="note-card locked-note">
          <i className="bx bx-lock locked-note-icon"></i>
          <div className="note-options">
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
      ) : (
        <div className="note-card">
          <h3 className="note-card-title">Monday</h3>
          <div className="note-labels">
            <span className="note-card-labels">Work</span>
            <span className="note-card-labels">Project</span>
            <span className="note-card-labels">Ideas</span>
          </div>
          <p className="note-card-content">Hello world!</p>
          <div className="note-options">
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>

          {/* Popup note options */}
          <div className="note-menu">
            <div className="menu-item">
              <i className="bx bx-pin"></i> Pin
            </div>
            <div className="menu-item">
              <i className="bx bx-pin-slash-alt"></i> Unpin
            </div>
            <div className="menu-item">
              <i className="bx bx-edit editNote-icon"></i> Edit
            </div>
            <div className="menu-item">
              <i className="bx bx-share"></i> Share
            </div>
            <div className="menu-item">
              <i className="bx bx-lock"></i> Lock
            </div>
            <div className="menu-item">
              <i className="bx bx-lock-open-alt"></i> Unlock
            </div>
            <div className="menu-item">
              <i className="bx bx-key"></i> Change password
            </div>
            <div className="menu-item deleteNote-icon">
              <i className="bx bx-trash"></i> Delete
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteItem;
