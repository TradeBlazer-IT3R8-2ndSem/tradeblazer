import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import '../../styles/components/ui/ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isLiked = favorites.some(p => p.id === product.id); 

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

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
        <p className="price">{product.price}</p>
        <button className="view-btn" onClick={handleViewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;