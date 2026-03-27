import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import "../../styles/components/ui/ProductCard.css";

const ProductCard = ({ product, onViewDetails, onEdit, onDelete, currentUserId }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isLiked = favorites.some((p) => p.id === product.id);

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete && onDelete) {
      onDelete(product.id);
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
            👁️ View
          </button>

          {product.seller_id === currentUserId && (
            <>
              {onEdit && (
                <button
                  className="edit-btn"
                  onClick={() => onEdit(product)}
                >
                  ✏️ Edit
                </button>
              )}
              {onDelete && (
                <button
                  className="delete-btn"
                  onClick={handleDeleteClick}
                >
                  🗑️ Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;