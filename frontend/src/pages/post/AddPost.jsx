import { useState } from "react";
import "../../styles/pages/post/AddPost.css";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", formData);

    // TODO:
    // Send to backend here using fetch or axios

    alert("Product added successfully!");

    // Reset form
    setFormData({
      title: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
    setPreview(null);
  };

  return (
    <div className="addpost-container">
      <h2>Add New Product</h2>

      <form className="addpost-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            <option value="Gifts">Gifts</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
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

        <button type="submit" className="submit-btn">
          Post Product
        </button>
      </form>
    </div>
  );
};

export default AddPost;