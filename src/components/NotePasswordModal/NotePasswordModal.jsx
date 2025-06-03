import React from "react";
import "./notePasswordModal.css";

const NotePasswordModal = ({ isOpen, onClose, noteItem, action }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="changePwd-popup" onClick={handleOverlayClick}>
      <div className="changePwd-popup-content" onClick={handleModalClick}>
        <h3 className="changePwd-popup-title">
          {action === "set" ? "Set" : action === "change" ? "Change" : "Enter"}{" "}
          Password
        </h3>
        <form className="change-password-form">
          {action === "change" && (
            <>
              <label>
                <span>Old Password</span>
                <input
                  type="password"
                  placeholder="Enter old password"
                  required
                />
              </label>
              <label>
                <span>New Password</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  required
                />
              </label>
              <label>
                <span>Confirm New Password</span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  required
                />
              </label>
            </>
          )}
          {action === "set" && (
            <>
              <label>
                <span>Password</span>
                <input type="password" placeholder="Enter password" required />
              </label>
              <label>
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </label>
            </>
          )}
          {action === "enter" && (
            <>
              <label>
                <span>Password</span>
                <input type="password" placeholder="Enter password" required />
              </label>
            </>
          )}

          <div className="popup-buttons">
            <button
              type="button"
              className="changePwd-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="changePwd-update-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotePasswordModal;
