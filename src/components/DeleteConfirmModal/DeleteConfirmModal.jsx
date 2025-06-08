import React, { useState } from "react";
import "./deleteConfirmModal.css";
import { useNote } from "../../context/NoteContext";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  itemName,
  itemId,
  itemType,
}) => {
  if (!isOpen) {
    return null;
  }

  const { deleteLabel, deleteNote } = useNote();
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteItem = async () => {
    if (itemType === "tag") {
      try {
        setLoading(true);
        await deleteLabel(itemId);
        setLoading(false);
        onClose();
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Something went wrong. Please try again later!");
      }
    } else {
      try {
        setLoading(true);
        await deleteNote(itemId);
        setLoading(false);
        onClose();
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Something went wrong. Please try again later!");
      }
    }
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
          <button
            id="confirm-delete-note"
            className="danger"
            onClick={handleDeleteItem}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
