import { useState, useEffect } from "react";
import "../../styles/pages/profile/Profile.css";

const EditProfile = ({ isOpen, onClose, profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    department: "",
    email: "",
    number: "",
    address: "",
    profilePicture: "",
    profileFile: null,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        studentId: profile.studentId || "",
        department: profile.department || "",
        email: profile.email || "",
        number: profile.number || "",
        address: profile.address || "",
        profilePicture: profile.profilePicture || "",
        profileFile: null,
      });
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(file), // preview only
        profileFile: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile?.id) {
      console.error("Cannot submit: profile ID missing!");
      return;
    }

    const data = new FormData();
    data.append("username", formData.name);
    data.append("email", formData.email);
    data.append("student_id", formData.studentId);
    data.append("phone_number", formData.number);
    data.append("address", formData.address);
    data.append("department", formData.department);

    if (formData.profileFile) {
      data.append("profile_image", formData.profileFile);
    }

    onSubmit(data, profile.id);
  };

  const updateProfile = async (formData, userId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend error:", data);
        throw new Error(JSON.stringify(data));
      }

      console.log("Success:", data);
    } catch (err) {
      console.error("Failed to update profile:", err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="addpost-container modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Edit Profile</h2>
        <form className="addpost-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Student ID</label>
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.profilePicture && (
              <div className="image-preview">
                <img src={formData.profilePicture} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;