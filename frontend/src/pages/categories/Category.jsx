import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import ProductDetail from "../dashboard/ProductDetail";
import "../../styles/pages/categories/Category.css";

const Category = () => {
  const { categoryId } = useParams(); // URL will be /category/:categoryId
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch category info
        const catRes = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        const catData = await catRes.json();
        setCategoryName(catData.name);

        // Fetch posts
        const prodRes = await fetch("http://127.0.0.1:8000/api/posts/", {
          headers: { Authorization: `Token ${token}` },
        });
        const prodData = await prodRes.json();

        // Filter posts by category ID
        const results = prodData.filter((product) => product.category === parseInt(categoryId));
        setFilteredProducts(results);
      } catch (err) {
        console.error("Failed to fetch category/products:", err);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  return (
    <div className="category-wrapper">
      <div className="category-container">
        <h1>{categoryName}</h1>

        {filteredProducts.length > 0 ? (
          <div className="category-results">
            <p className="result-count">{filteredProducts.length} product(s) in this category</p>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <p>No products found in {categoryName}</p>
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

export default Category;