import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import "../../styles/pages/categories/Category.css";

const Category = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categoryMap = {
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home & Living",
    sports: "Sports",
    beauty: "Beauty",
    gifts: "Gifts",
  };

  const allProducts = [
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

  useEffect(() => {
    const categoryName = categoryMap[category] || category;
    const results = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(results);
  }, [category]);

  const displayCategoryName = categoryMap[category] || category;

  return (
    <div className="category-wrapper">
      <div className="category-container">
        <h1>{displayCategoryName}</h1>
        
        {filteredProducts.length > 0 ? (
          <div className="category-results">
            <p className="result-count">{filteredProducts.length} product(s) in this category</p>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <p>No products found in {displayCategoryName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
