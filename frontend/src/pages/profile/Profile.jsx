// src/pages/profile/Profile.jsx
import { useState, useEffect } from "react";
import "../../styles/pages/profile/Profile.css";
import ProductCard from "../../components/ui/ProductCard";
import AddPost from "../post/AddPost";

const Profile = () => {
  // ---------- Dynamic Profile Details ----------
  const [profile, setProfile] = useState({
    name: "Jennie Kim",
    studentId: "2023392632",
    department: "BS Information Technology",
    email: "kimjennie@email.com",
    number: "09123456789",
    address: "Buena Oro, Cagayan de Oro City",
  });

  // ---------- Posts State ----------
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("userPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem("userPosts", JSON.stringify(posts));
  }, [posts]);

  // ---------- Modal State ----------
  const [showAddPost, setShowAddPost] = useState(false);

  // ---------- AddPost Submit Handler ----------
  const handleAddPost = (newPost) => {
    // Assign unique ID
    const postWithId = { ...newPost, id: Date.now() };
    setPosts([postWithId, ...posts]);
  };

  return (
    <div className="profile-container">

      {/* LEFT SIDE */}
      <div className="profile-left">
        <div className="profile-header">
          <div className="profile-picture"></div>
          <h2 className="profile-name">{profile.name}</h2>
        </div>

        <div className="profile-info">
          <p><strong>Student ID:</strong> {profile.studentId}</p>
          <p><strong>Department:</strong> {profile.department}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Number:</strong> {profile.number}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
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
          {posts.length === 0 ? (
            <p>No posts yet...</p>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <ProductCard
                  key={post.id}
                  product={{
                    name: post.title,
                    price: post.price,
                    category: post.category,
                    image: post.image,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADD POST MODAL */}
      <AddPost
        isOpen={showAddPost}
        onClose={() => setShowAddPost(false)}
        onSubmit={handleAddPost}
      />
    </div>
  );
};

export default Profile;