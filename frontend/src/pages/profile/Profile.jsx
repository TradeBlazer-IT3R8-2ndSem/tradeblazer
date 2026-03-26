import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/profile/Profile.css";
import ProductCard from "../../components/ui/ProductCard";
import AddPost from "../post/AddPost";
import ProductDetail from "../dashboard/ProductDetail";
import EditProfile from "./EditProfile";
import { PostsContext } from "../../context/PostsContext";
import { retrieveUser, updateUser } from "../../services/userService.js";
import { createPost } from "../../services/postService";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { posts, addPost } = useContext(PostsContext);

  // Fetch logged-in user from backend
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      navigate("/login");
      return;
    }
    console.log(userData);

    // You can fetch full user details from backend if needed
    setProfile({
      id: userData.id,
      name: userData.username || "User",
      studentId: userData.student_id || "N/A",
      department: userData.department || "N/A",
      email: userData.email || "N/A",
      number: userData.phone_number || "N/A",
      address: userData.address || "N/A",
      profilePicture: userData.profile_image
        ? `http://127.0.0.1:8000${userData.profile_image}` // <-- prepend backend URL
        : "",
    });
    setLoading(false);
  }, [navigate]);

  
  const userPosts = profile
    ? posts.filter((post) => post.seller === profile.name)
    : [];

  const [showAddPost, setShowAddPost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) throw new Error("User not logged in");

      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("description", newPost.description);
      formData.append("price", newPost.price);
      formData.append("category", newPost.category);
      formData.append("seller", userData.id); // backend expects ID
      if (newPost.image) {
        formData.append("image", newPost.image);
      }

      // 🔹 POST to backend
      const savedPost = await createPost(formData); 

      // 🔹 Update local state with backend response
      addPost(savedPost, { name: userData.username });

      setShowAddPost(false);
    } catch (error) {
      console.error("Failed to post product:", error);
      alert("Failed to post product: " + error.message);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleUpdateProfile = async (formData, userId) => {
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

      // Update profile with backend URL
      setProfile((prev) => ({
        ...prev,
        ...data,
        profilePicture: data.profile_image || prev.profilePicture,
      }));

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, ...data })
      );

      setShowEditProfile(false);
    } catch (err) {
      console.error("Failed to update profile:", err.message);
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-header">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <div className="profile-picture">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" />
            ) : (
              <div className="placeholder">No Image</div>
            )}
          </div>
          <h2 className="profile-name">{profile.name}</h2>
        </div>

        <div className="profile-info">
          <p><strong>ID:</strong> {profile.studentId}</p>
          <p><strong>Department:</strong> {profile.department}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Number:</strong> {profile.number}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      </div>

      <div className="profile-right">
        <div className="add-product-container">
          <button
            className="add-product-btn"
            onClick={() => setShowAddPost(true)}
          >
            + Add Product
          </button>
        </div>

        <div className="posts-container">
          <h3>User Posts</h3>
          {userPosts.length === 0 ? (
            <p>No posts yet...</p>
          ) : (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <ProductCard
                  key={post.id}
                  product={post}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Post Modal */}
      <AddPost
        isOpen={showAddPost}
        onClose={() => setShowAddPost(false)}
        onSubmit={handleAddPost}
      />

      {/* Edit Profile Modal */}
      <EditProfile
        isOpen={showEditProfile}
        profile={profile}
        onClose={() => setShowEditProfile(false)}
        onSubmit={(data, id) => handleUpdateProfile(data, id)}
      />

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onUpdate={(updatedProduct) => setSelectedProduct(updatedProduct)}
      />
    </div>
  );
};

export default Profile;