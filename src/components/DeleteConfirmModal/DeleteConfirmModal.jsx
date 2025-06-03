import React from "react";
import "./deleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, onClose, itemName }) => {
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
      id="deleteNote-popup"
      className="deleteNote-popup"
      onClick={handleOverlayClick}
    >
      <div className="deleteNote-popup-box" onClick={handleModalClick}>
        <p>Are you sure you want to delete this {itemName}?</p>
        <div className="deleteNote-popup-buttons">
          <button id="cancel-delete-note" onClick={onClose}>
            Cancel
          </button>
          <button id="confirm-delete-note" className="danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
