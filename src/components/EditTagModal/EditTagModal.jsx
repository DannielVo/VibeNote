import React, { useState } from "react";
import "./editTagModal.css";
import { useNote } from "../../context/NoteContext";

const EditTagModal = ({ isOpen, onClose, tagItem }) => {
  if (!isOpen) {
    return null;
  }

  const { updateLabel } = useNote();
  const [tagName, setTagName] = useState(tagItem.labelName || "");
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleUpdateItem = async () => {
    try {
      setLoading(true);
      await updateLabel(tagItem.id, tagName);
      setLoading(false);

      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong. Please try again later!");
    }
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
          value={tagName}
          type="text"
          id="editTag-input"
          placeholder="Edit tag name"
          onChange={(e) => setTagName(e.target.value)}
        />
        <div className="editTag-popup-buttons">
          <button
            id="cancel-edit-tag"
            className="cancelEdit-tag-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            id="confirm-edit-tag"
            className="confirmEdit-tag-btn"
            onClick={handleUpdateItem}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagModal;
