import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/profile/Profile.css";
import ProductCard from "../../components/ui/ProductCard";
import AddPost from "../post/AddPost";
import ProductDetail from "../dashboard/ProductDetail";
import { PostsContext } from "../../context/PostsContext";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userData"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setProfile({
        name: loggedUser.name || "User",
        studentId: loggedUser.studentId || "N/A",
        department: loggedUser.department || "N/A",
        email: loggedUser.email || "N/A",
        number: loggedUser.number || "N/A",
        address: loggedUser.address || "N/A",
      });
    }
  }, [navigate]);

  const { posts, addPost } = useContext(PostsContext);

  const [showAddPost, setShowAddPost] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddPost = (newPost) => {
    addPost(newPost, profile);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">

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
                    description: post.description,
                  }}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* add post modal */}
      <AddPost
        isOpen={showAddPost}
        onClose={() => setShowAddPost(false)}
        onSubmit={handleAddPost}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Profile;