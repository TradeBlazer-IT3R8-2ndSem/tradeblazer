import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import ProductDetail from "./ProductDetail";
import "../../styles/pages/dashboard/Home.css";
import { getCategories, getPosts } from "../../services/api";
import { PostsContext } from "../../context/PostsContext";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { posts } = useContext(PostsContext);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userData"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  const categories = [
    "Recommended",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Gifts",
  ];

  const bestSelling = [
    { id: 1, name: "Ferrero Bouquet", price: "1,100", category: "Gifts", image: "/ferrero.jpg", seller: "TradeBlazer" },
    { id: 2, name: "Keychain", price: "600", category: "Gifts", image: "/keychain.jpg", seller: "TradeBlazer" },
    { id: 3, name: "Plush Teddy Bear", price: "600", category: "Gifts", image: "/teddybear.jpg", seller: "TradeBlazer" },
    { id: 4, name: "Flower Bouquet", price: "500", category: "Gifts", image: "/flowerbouquet.jpg", seller: "TradeBlazer" },
    { id: 5, name: "Chocolate Box", price: "400", category: "Gifts", image: "/chocolatebox.jpg", seller: "TradeBlazer" },
  ];

  const hardcodedProducts = [
    { id: 6, name: "Hair Clamps", price: "25", category: "Fashion", image: "/hairclamps.jpg", seller: "TradeBlazer" },
    { id: 7, name: "Socks", price: "50", category: "Fashion", image: "/socks.jpg", seller: "TradeBlazer" },
    { id: 8, name: "Phone Case", price: "150", category: "Electronics", image: "/phonecase.jpg", seller: "TradeBlazer" },
    { id: 9, name: "Hand Bag", price: "30", category: "Gifts", image: "/handbag.jpg", seller: "TradeBlazer" },
    { id: 10, name: "Wallet", price: "200", category: "Fashion", image: "/wallet.jpg", seller: "TradeBlazer" },
    { id: 11, name: "Backpack", price: "500", category: "Fashion", image: "/backpack.jpg", seller: "TradeBlazer" },
    { id: 12, name: "Sunglasses", price: "300", category: "Fashion", image: "/sunglasses.jpg", seller: "TradeBlazer" },
  ];

  const userPosts = posts.map(post => ({
    id: post.id,
    name: post.title,
    price: post.price,
    category: post.category,
    image: post.image,
    description: post.description,
    seller: post.seller,
  }));

  const allProducts = [...hardcodedProducts, ...userPosts];

  const filteredProducts =
    selectedCategory === "Recommended"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  return (
    <div className="home-wrapper">

      <div className="announcement">
        <img src="public/banner.gif" alt="Announcement Banner" />
      </div>

      <div className="home-container">
        <section className="section">
          <h2>Top 5 Best Selling</h2>
          <div className="product-row">
            {bestSelling.map((item) => (
              <ProductCard key={item.id} product={item} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Categories</h2>
          <div className="category-row">
            {categories.map((cat, index) => (
              <CategoryBox
                key={index}
                name={cat}
                onClick={() => setSelectedCategory(cat)}
                isActive={selectedCategory === cat}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Products</h2>
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p className="no-products">No products available in this category.</p>
            ) : (
              filteredProducts.map((item) => <ProductCard key={item.id} product={item} onViewDetails={handleViewDetails} />)
            )}
          </div>
        </section>
      </div>

      <ProductDetail
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onUpdate={(updatedProduct) => setSelectedProduct(updatedProduct)}
      />
    </div>
  );
};

export default Home;