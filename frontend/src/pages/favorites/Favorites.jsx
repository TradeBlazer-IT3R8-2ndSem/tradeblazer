import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import ProductCard from "../../components/ui/ProductCard";
import "../../styles/pages/dashboard/Home.css"
import "../../styles/pages/favorites/Favorites.css"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <p style={{ padding: "20px" }}>No favorite products yet!</p>;
  }

      return (
        <section className="favorites-section">
          <h2 className="favorites-header">My Favorites</h2>
          <div className="product-grid">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
  );
};

export default Favorites;

