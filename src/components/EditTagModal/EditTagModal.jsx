import React from "react";
import "./editTagModal.css";

const EditTagModal = ({ isOpen, onClose, tagItem }) => {
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
    <div
      id="editTag-popup"
      className="editTag-popup"
      onClick={handleOverlayClick}
    >
      <div className="editTag-popup-box" onClick={handleModalClick}>
        <p className="editTag-popup-title">Edit tag</p>
        <input
          value={tagItem.tagName}
          type="text"
          id="editTag-input"
          placeholder="Edit tag name"
        />
        <div className="editTag-popup-buttons">
          <button
            id="cancel-edit-tag"
            className="cancelEdit-tag-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button id="confirm-edit-tag" className="confirmEdit-tag-btn">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagModal;
