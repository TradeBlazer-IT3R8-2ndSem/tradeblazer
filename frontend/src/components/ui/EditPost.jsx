import { useState } from "react";
import "../../styles/components/ui/EditPost.css"; // ✅ import CSS

const EditPost = ({ product, onClose, onSubmit }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(product.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit Post</h3>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={1}>Electronics</option>
            <option value={2}>Gifts</option>
            <option value={3}>Fashion</option>
            <option value={4}>Home & Living</option>
            <option value={5}>Sports</option>
            <option value={6}>Beauty</option>
            <option value={7}>Clothes</option>
            <option value={8}>Accessories</option>
          </select>

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;