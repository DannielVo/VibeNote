import React, { useState } from "react";
import "./toolBarSection.css";
import { useNote } from "../../../context/NoteContext";
import DeleteConfirmModal from "../../../components/DeleteConfirmModal/DeleteConfirmModal";
import EditTagModal from "../../../components/EditTagModal/EditTagModal";
import { TAGS } from "../../../assets/assets";

const ToolBarSection = () => {
  const { toggleGridListView, isGridView } = useNote();
  const [isTagAreaOpen, setIsTagAreaOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState({});

  const openEditModal = (selectedItem) => {
    setSelectedTag(selectedItem);
    setIsEditTagModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditTagModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleTagArea = () => {
    setIsTagAreaOpen((prev) => !prev);
  };

  return (
    <>
      {/* <!-- Row 3: TAGS + VIEW + FILTER --> */}
      <div className="toolbar">
        <i className="bx bx-price-tag" title="Tags" onClick={toggleTagArea}></i>
        {isGridView ? (
          <i
            className="bx bx-grid icon-button"
            id="grid-view"
            title="Grid view"
            onClick={toggleGridListView}
          ></i>
        ) : (
          <i
            className="bx bx-list-ul icon-button"
            id="list-view"
            title="List view"
            onClick={toggleGridListView}
          ></i>
        )}

        <div className="filter-note-bar" title="Filter notes">
          <select id="note-filter">
            <option value="modified">Last modified</option>
            <option value="created">Last created</option>
          </select>
        </div>
      </div>

      {/* <!-- Row 4: TAG AREA --> */}
      {isTagAreaOpen && (
        <div className="tag-area">
          <div className="tag-input-bar">
            <input type="text" placeholder="Search/add tag..." />
            <i className="bx bx-search"></i>
            <i className="bx bx-plus"></i>
            {/* <i className="bx bx-check-square"></i> */}
          </div>
          <div className="tag-list">
            {TAGS.map((item, index) => (
              <div className="tag" key={`tagItem ${index}`}>
                <i
                  className="bx bx-x deleteTag-icon"
                  onClick={openDeleteModal}
                ></i>
                <span>{item.tagName}</span>
                <i
                  className="bx bx-edit editTag-icon"
                  onClick={() => openEditModal(item)}
                ></i>
              </div>
            ))}
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemName={"tag"}
      ></DeleteConfirmModal>

      <EditTagModal
        isOpen={isEditTagModalOpen}
        onClose={closeEditModal}
        tagItem={selectedTag}
      ></EditTagModal>

      {/* <!-- Row 5: DISPLAY TAGS --> */}
      <div className="display-tags">
        <p>Tags: work, personal, project</p>
      </div>
    </>
  );
};

export default ToolBarSection;
