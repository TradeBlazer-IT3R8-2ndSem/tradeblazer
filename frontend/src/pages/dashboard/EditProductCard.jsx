import React from 'react';
import '../../styles/pages/dashboard/EditProductCard.css';

const EditProductCard = ({ editFormData, onEditChange, onEditSubmit, onCancelEdit }) => {
  return (
    <div className="edit-form-container">
      <h2>Edit Product</h2>
      <div className="edit-form">
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={onEditChange}
            placeholder="Enter product title"
          />
        </div>

        <div className="form-group">
          <label>Price (₱)</label>
          <input
            type="text"
            name="price"
            value={editFormData.price}
            onChange={onEditChange}
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={editFormData.category}
            onChange={onEditChange}
            placeholder="Enter category"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={editFormData.description}
            onChange={onEditChange}
            placeholder="Enter description"
            rows="4"
          />
        </div>

        <div className="edit-actions">
          <button className="save-btn" onClick={onEditSubmit}>Save Changes</button>
          <button className="cancel-btn" onClick={onCancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductCard;
