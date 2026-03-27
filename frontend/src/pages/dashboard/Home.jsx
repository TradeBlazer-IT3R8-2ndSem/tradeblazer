import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import ProductDetail from "./ProductDetail";
import "../../styles/pages/dashboard/Home.css";
import { getCategories, getBestSellingPosts } from "../../services/api";
import { PostsContext } from "../../context/PostsContext";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([{ id: 0, name: "Recommended" }]);
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bestSelling, setBestSelling] = useState([]);

  const { posts } = useContext(PostsContext);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userData"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  // ✅ Fetch Best Selling
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const data = await getBestSellingPosts();
        setBestSelling(data);
      } catch (err) {
        console.error("Failed to fetch best selling:", err);
      }
    };
    fetchBestSelling();
  }, []);

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // [{id:1, name:"Electronics"}, ...]
        setCategories([{ id: 0, name: "Recommended" }, ...data]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const userPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    price: post.price,
    categoryName: post.categoryName,
    image: post.image,
    description: post.description,
    seller: post.seller,
    seller_id: post.seller_id,
  }));

  const allProducts = [ ...userPosts]; 

  const filteredProducts =
    selectedCategory === "Recommended"
      ? allProducts
      : allProducts.filter((product) => product.categoryName === selectedCategory);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  return (
    <div className="home-wrapper">
      <div className="announcement">
        <img src="/banner.gif" alt="Announcement Banner" />
      </div>

      <div className="home-container">
        {/* ✅ Best Selling Section */}
        <section className="section">
          <h2>Top 5 Best Selling</h2>
          <div className="product-row">
            {bestSelling.map((item) => (
              <ProductCard key={item.id} product={item} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </section>

        {/* ✅ Categories Section */}
        <section className="section">
          <h2>Categories</h2>
          <div className="category-row">
            {categories.map((cat) => (
              <CategoryBox
                key={cat.id}
                name={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                isActive={selectedCategory === cat.name}
              />
            ))}
          </div>
        </section>

        {/* ✅ Products Section */}
        <section className="section">
          <h2>Products</h2>
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p className="no-products">No products available in this category.</p>
            ) : (
              filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} onViewDetails={handleViewDetails} />
              ))
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