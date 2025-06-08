import React, { useEffect, useState } from "react";
import "./profile.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useNote } from "../../context/NoteContext";
import API from "../../hooks/api";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullname) {
      alert("Fullname cannot be empty!");
      return;
    }

    if (!email && !phone) {
      alert(
        "Email and phone cannot be both empty! You have to fill in email or phone."
      );
      return;
    }

    // Tạo request body cho đăng nhập
    const dataRequest = {
      name: fullname,
      email: email,
    };

    try {
      setLoading(true);
      const response = await API.put("/user/profile", dataRequest);
      setLoading(false);
      alert("Successfully updated user!");
    } catch (err) {
      setLoading(false);
      alert(
        "Something went wrong. Please check the data input and try again later!"
      );
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await API.get("/user");
          setEmail(response.data.email);
          setFullname(response.data.name);
        } catch (error) {
          alert("Error fetching profile:", error);
        }
      };

      fetchData();
    } catch (error) {}
  }, []);

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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <button className="update-button" onClick={handleUpdate}>
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
