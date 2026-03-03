import "../../styles/pages/profile/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">

      {/* LEFT SIDE */}
      <div className="profile-left">
        
        <div className="profile-header">
          <div className="profile-picture"></div>
          <h2 className="profile-name">Jennie Kim</h2>
        </div>

        <div className="profile-info">
          <p><strong>Student ID:</strong> 2023392632</p>
          <p><strong>Department:</strong> BS Information Technology</p>
          <p><strong>Email:</strong> kimjennie@email.com</p>
          <p><strong>Number:</strong> 09123456789</p>
          <p><strong>Address:</strong> Buena Oro, Cagayan de Oro City</p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">

        <div className="add-product-container">
            <button
            className="add-product-btn"
            onClick={() => navigate("/add-post")}
            >
            + Add Product
            </button>
        </div>

        <div className="posts-container">
          <h3>User Posts</h3>
          <p>No posts yet...</p>
        </div>

      </div>

    </div>
  );
};

export default Profile;