import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import '../../styles/components/ui/ProductCard.css';

const ProductCard = ({ product, onViewDetails, onEdit, onDelete }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isLiked = favorites.some(p => p.id === product.id); 

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
        <button
          className={`like-btn ${isLiked ? 'active' : ''}`}
          onClick={() => toggleFavorite(product)}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-content">
        <span className="category-tag">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">₱{product.price}</p>

        <div className="card-actions">
          <button className="view-btn" onClick={() => onViewDetails && onViewDetails(product)}>
            View
          </button>
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(product)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;