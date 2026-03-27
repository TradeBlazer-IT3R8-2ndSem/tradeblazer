import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryBox from '../../components/ui/CategoryBox';
import ProductCard from '../../components/ui/ProductCard';
import '../../styles/pages/categories/Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch categories
        const catRes = await fetch("http://127.0.0.1:8000/api/categories/", {
          headers: { Authorization: `Token ${token}` },
        });
        const catData = await catRes.json();
        setCategories(catData);

        // Fetch posts
        const prodRes = await fetch("http://127.0.0.1:8000/api/posts/", {
          headers: { Authorization: `Token ${token}` },
        });
        const prodData = await prodRes.json();
        setProducts(prodData);
      } catch (err) {
        console.error("Failed to fetch categories/products:", err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (cat) => {
    if (selectedCategory && selectedCategory.id === cat.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat);
    }
  };

  const handleViewDetails = (product) => {
    navigate(`/category/${product.category}`); // product.category is ID
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category === categoryId);
  };

  return (
    <div className="categories-page">
      <h1>All Categories</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryBox
            key={cat.id}
            name={cat.name}
            onClick={() => handleCategoryClick(cat)}
            isActive={selectedCategory?.id === cat.id}
          />
        ))}
      </div>
      
      <div className="categories-sections">
        {(selectedCategory ? [selectedCategory] : categories).map((cat) => {
          const categoryProducts = getProductsByCategory(cat.id);
          return (
            <div key={cat.id} className="category-section">
              <h2 className="category-title">{cat.name}</h2>
              {categoryProducts.length > 0 ? (
                <div className="products-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={() => handleViewDetails(product)}
                    />
                  ))}
                </div>
              ) : (
                <p className="no-products">No products available in this category</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;