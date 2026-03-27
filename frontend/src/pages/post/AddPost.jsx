import { useState } from "react";
import "../../styles/pages/post/AddPost.css"; 
import { createPost } from "../../services/api";

const AddPost = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      const newPost = await createPost(formData);
      console.log("Post created:", newPost);
      // ✅ reset form after success
      setTitle(""); setDescription(""); setPrice(""); setCategory(""); setImage(null); setPreview(null);
      onClose();
    } catch (err) {
      console.error("Failed to post product:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="addpost-container modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Add New Product</h2>
        <form className="addpost-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₱)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Gifts</option>
              <option value="3">Fashion</option>
              <option value="4">Home & Living</option>
              <option value="5">Sports</option>
              <option value="6">Beauty</option>
              <option value="7">Clothes</option>
              <option value="8">Accessories</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-btn">Post Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;