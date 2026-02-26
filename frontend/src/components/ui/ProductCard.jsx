import React, { useState } from 'react';
import '../../styles/components/ui/ProductCard.css';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { name, price, image, category } = product;

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={image || 'https://via.placeholder.com/150'} alt={name} />
        <button 
          className={`like-btn ${isLiked ? 'active' : ''}`} 
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-content">
        <span className="category-tag">{category}</span>
        <h3>{name}</h3>
        <p className="price">{price}</p>
        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;