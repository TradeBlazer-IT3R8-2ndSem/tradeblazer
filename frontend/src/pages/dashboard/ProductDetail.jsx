import React from 'react';
import '../../styles/pages/dashboard/ProductDetail.css';

const ProductDetail = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="product-detail-content">
          <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="product-image" />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="category">Category: {product.category}</p>
            <p className="price">{product.price}</p>
            {product.description && <p className="description">{product.description}</p>}
            {product.seller && <p className="seller">Sold by: {product.seller}</p>}
            <button className="chat-btn">Chat Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;