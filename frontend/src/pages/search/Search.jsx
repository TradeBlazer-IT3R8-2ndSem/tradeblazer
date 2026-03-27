import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import ProductDetail from "../dashboard/ProductDetail";
import "../../styles/pages/search/Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const query = searchParams.get("q") || "";

  // Fetch all posts from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/posts/", {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by query
  useEffect(() => {
    if (query.trim()) {
      const results = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, allProducts]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <h1>Search Results for "{query}"</h1>
        
        {filteredProducts.length > 0 ? (
          <div className="search-results">
            <p className="result-count">Found {filteredProducts.length} product(s)</p>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => handleViewDetails(product)}
                />
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

      <ProductDetail
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Search;