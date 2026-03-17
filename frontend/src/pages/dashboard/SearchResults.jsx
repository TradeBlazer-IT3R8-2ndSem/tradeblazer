Search.jsx

import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import { PostsContext } from "../../context/PostsContext";
import "../../styles/pages/search/Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const query = searchParams.get("q") || "";
  const { posts } = useContext(PostsContext);

  // Hardcoded products
  const hardcodedProducts = [
    { id: 1, name: "Ferrero Bouquet", price: "₱1,100", category: "Gifts", image: "/public/ferrero.jpg" },
    { id: 2, name: "Keychain", price: "₱600", category: "Gifts", image: "/public/keychain.jpg" },
    { id: 3, name: "Plush Teddy Bear", price: "₱600", category: "Gifts", image: "/public/teddybear.jpg" },
    { id: 4, name: "Flower Bouquet", price: "₱500", category: "Gifts", image: "/public/flowerbouquet.jpg" },
    { id: 5, name: "Chocolate Box", price: "₱400", category: "Gifts", image: "/public/chocolatebox.jpg" },
    { id: 6, name: "Hair Clamps", price: "₱25", category: "Fashion", image: "/public/hairclamps.jpg" },
    { id: 7, name: "Socks", price: "₱50", category: "Fashion", image: "/public/socks.jpg" },
    { id: 8, name: "Phone Case", price: "₱150", category: "Electronics", image: "/public/phonecase.jpg" },
    { id: 9, name: "Hand Bag", price: "₱30", category: "Gifts", image: "/public/handbag.jpg" },
    { id: 10, name: "Wallet", price: "₱200", category: "Fashion", image: "/public/wallet.jpg" },
    { id: 11, name: "Backpack", price: "₱500", category: "Fashion", image: "/public/backpack.jpg" },
    { id: 12, name: "Sunglasses", price: "₱300", category: "Fashion", image: "/public/sunglasses.jpg" },
  ];

  // Convert user posts to product format
  const userProducts = posts.map(post => ({
    id: post.id,
    name: post.title,
    price: post.price,
    category: post.category,
    image: post.image,
    description: post.description,
    seller: post.seller,
  }));

  // Combine hardcoded and user products
  const allProducts = [...hardcodedProducts, ...userProducts];

  useEffect(() => {
    if (query.trim()) {
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, allProducts]);

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <h1>Search Results for "{query}"</h1>
        
        {filteredProducts.length > 0 ? (
          <div className="search-results">
            <p className="result-count">Found {filteredProducts.length} product(s)</p>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <p>No products found matching "{query}"</p>
            <p className="hint">Try searching for another product or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
