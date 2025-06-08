import React, { useState } from "react";
import "./notePasswordModal.css";

const NotePasswordModal = ({
  isOpen,
  onClose,
  noteItem,
  action,
  onSuccess,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "enter") {
      if (password === noteItem.notePassword) {
        onSuccess(password);
      } else {
        alert("Wrong password");
      }
    } else if (action === "set" || action === "change") {
      if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
      }
      if (password !== cPassword) {
        alert("Passwords do not match");
        return;
      }

      if (action === "change") {
        if (oldPassword !== noteItem.notePassword) {
          alert("Old password is incorrect");
          return;
        }
      }

      onSuccess(password);
    }
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
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </label>
              <label>
                <span>New Password</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                <span>Confirm New Password</span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </label>
            </>
          )}
          {action === "set" && (
            <>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </label>
            </>
          )}
          {action === "enter" && (
            <>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
            <button
              type="submit"
              className="changePwd-update-btn"
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotePasswordModal;
