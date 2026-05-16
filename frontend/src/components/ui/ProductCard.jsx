import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import "../../styles/components/ui/ProductCard.css";

const ProductCard = ({ product, onViewDetails, onEdit, onDelete, currentUserId }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isLiked = favorites.some(p => p.id === product.id);

  // ✅ Safe comparison — handles number vs string mismatch
  const isOwner = currentUserId && product.seller_id &&
    String(product.seller_id) === String(currentUserId);

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (onDelete) onDelete(product.id);
    }
  };

  return (
    <div className="product-card">
      <div className="card-image">
        <img
          src={product.image || "https://placehold.co/150x150"}
          alt={product.title || "Product"}
        />
        <button
          className={`like-btn ${isLiked ? "active" : ""}`}
          onClick={() => toggleFavorite(product)}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-content">
        <span className="category-tag">{product.categoryName}</span>
        <h3>{product.title}</h3>
        <p className="price">₱{product.price}</p>

        <div className="card-actions">
          <button
            className="view-btn"
            onClick={() => onViewDetails && onViewDetails(product)}
          >
            View
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;