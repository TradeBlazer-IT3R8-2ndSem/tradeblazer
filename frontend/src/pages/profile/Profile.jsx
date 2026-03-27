import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/profile/Profile.css";
import ProductCard from "../../components/ui/ProductCard";
import AddPost from "../post/AddPost";
import ProductDetail from "../dashboard/ProductDetail";
import EditProfile from "./EditProfile";
import EditPost from "../../components/ui/EditPost";   // ✅ new component
import { PostsContext } from "../../context/PostsContext";
import { createPost } from "../../services/postService";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { posts, addPost, deletePost, updatePost } = useContext(PostsContext);

  // Map category IDs to names
  const categoryMap = {
    1: "Electronics",
    2: "Gifts",
    3: "Fashion",
    4: "Home & Living",
    5: "Sports",
    6: "Beauty",
    7: "Clothes",
    8: "Accessories",
  };

  // Fetch logged-in user
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setProfile({
      id: userData.id,
      name: userData.username || "User",
      studentId: userData.student_id || "N/A",
      department: userData.department || "N/A",
      email: userData.email || "N/A",
      number: userData.phone_number || "N/A",
      address: userData.address || "N/A",
      profilePicture: userData.profile_image
        ? `http://127.0.0.1:8000${userData.profile_image}`
        : "",
    });
    setLoading(false);
  }, [navigate]);

  const userPosts = profile
    ? posts.filter((post) => post.seller_id === profile.id)
    : [];

  const [showAddPost, setShowAddPost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Add Post
  const handleAddPost = async (newPost) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) throw new Error("User not logged in");

      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("description", newPost.description);
      formData.append("price", newPost.price);
      formData.append("category", Number(newPost.category));

      if (newPost.image) {
        formData.append("image", newPost.image);
      }

      const savedPost = await createPost(formData);
      savedPost.categoryName = categoryMap[savedPost.category];

      addPost(savedPost);
      setShowAddPost(false);
    } catch (error) {
      console.error("Failed to post product:", error);
      alert("Failed to post product: " + error.message);
    }
  };

  // ✅ View Details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // ✅ Edit Post
  const handleEditPost = (product) => {
    setSelectedProduct(product);
    setShowEditPost(true);
  };

  // ✅ Delete Post
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId); // from PostsContext
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // ✅ Edit Profile
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

      setProfile((prev) => ({
        ...prev,
        ...data,
        profilePicture: data.profile_image || prev.profilePicture,
      }));

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));

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
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  currentUserId={profile.id}   // ✅ pass logged-in user ID
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddPost
        isOpen={showAddPost}
        onClose={() => setShowAddPost(false)}
        onSubmit={handleAddPost}
      />

      <EditProfile
        isOpen={showEditProfile}
        profile={profile}
        onClose={() => setShowEditProfile(false)}
        onSubmit={(data, id) => handleUpdateProfile(data, id)}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onUpdate={(updatedProduct) => setSelectedProduct(updatedProduct)}
      />

      {/* ✅ Edit Post Modal */}
      {showEditPost && selectedProduct && (
        <EditPost
          product={selectedProduct}
          onClose={() => setShowEditPost(false)}
          onSubmit={(id, updatedData) => updatePost(id, updatedData)}
        />
      )}
    </div>
  );
};

export default Profile;