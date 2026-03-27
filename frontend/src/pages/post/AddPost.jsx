import { useState } from "react";
import "../../styles/pages/post/AddPost.css"; 

const AddPost = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null,   // store raw File
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // ✅ keep raw File
      setPreview(URL.createObjectURL(file));     // ✅ preview with blob URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image!");

    onSubmit(formData);

    setFormData({
      title: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
    setPreview(null);
    onClose();
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₱)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
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