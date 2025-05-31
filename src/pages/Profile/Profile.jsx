import React from "react";
import "./profile.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      {" "}
      <div className="profile-container">
        <Link className="back-icon" to={"/"}>
          &#8592;
        </Link>

        <div className="avatar-wrapper">
          <div className="avatar-image">
            <label htmlFor="avatar-upload">
              <img id="avatar-img" src={assets.profileIcon} />
            </label>
            <input type="file" id="avatar-upload" accept="image/*" />
          </div>

          <div className="avatar-actions">
            <label
              htmlFor="avatar-upload"
              className="action-icon"
              title="Edit avatar"
            >
              <i className="bx bx-edit edit-icon"></i>
            </label>
            <button
              type="button"
              id="delete-avatar"
              className="action-icon"
              title="Delete avatar"
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        </div>

        <div className="info-group">
          <label>Email</label>
          <input type="email" />

          <label>Full Name</label>
          <input type="text" />
        </div>

        <button className="update-button">Update</button>
      </div>
    </div>
  );
};

export default Profile;
