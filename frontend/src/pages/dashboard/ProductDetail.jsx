import React, { useContext, useState, useEffect } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { PostsContext } from '../../context/PostsContext';
import { useChat } from '../../context/ChatContext';
import EditProductCard from './EditProductCard';
import '../../styles/pages/dashboard/ProductDetail.css';

const ProductDetail = ({ product, isOpen, onClose }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { deletePost, updatePost } = useContext(PostsContext);
  const { openChatWithSeller } = useChat();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setCurrentUser(userData);
  }, []);

  if (!isOpen || !product) return null;

  const isLiked = favorites.some(p => p.id === product.id);
  const isOwner = currentUser && product.seller === currentUser.name;

  const handleChatSeller = () => {
    if (product.seller) {
      openChatWithSeller(product.seller);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deletePost(product.id);
      onClose();
    }
  };

  const handleEditClick = () => {
    setEditFormData({
      title: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setIsEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    if (!editFormData.title || !editFormData.price || !editFormData.category) {
      alert('Please fill in all required fields');
      return;
    }
    updatePost(product.id, {
      name: editFormData.title,
      price: editFormData.price,
      category: editFormData.category,
      description: editFormData.description,
    });
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditFormData(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        {isEditMode && editFormData ? (
          <EditProductCard 
            editFormData={editFormData}
            onEditChange={handleEditChange}
            onEditSubmit={handleEditSubmit}
            onCancelEdit={handleCancelEdit}
          />
        ) : (
          <div className="product-detail-content">
            <div className="product-image-container">
              <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="product-image" />
              <button
                className={`favorite-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleFavorite(product)}
                title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isLiked ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="product-info">
              <div className="product-header">
                <h2>{product.name}</h2>
              </div>
              {product.seller && <p className="seller">Seller: {product.seller}</p>}
              <p className="category">Category: {product.category}</p>
              <p className="price">₱{product.price}</p>
              {product.description && <p className="description">{product.description}</p>}
              
              <div className="product-actions">
                {!isOwner && (
                  <button className="chat-btn" onClick={handleChatSeller}>Chat Seller</button>
                )}
              </div>
            </div>
            {isOwner && (
              <div className="bottom-product-actions">
                <button className="icon-btn edit-icon-btn" onClick={handleEditClick} title="Edit Product">
                  ✏️
                </button>
                <button className="icon-btn delete-icon-btn" onClick={handleDelete} title="Delete Product">
                  🗑️
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;