import Header from "../../components/layout/Header";
import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import "../../styles/pages/dashboard/Home.css";
import { useState } from "react";


const Home = () => {
  const categories = ["Recommended", "Electronics", "Fashion", "Home & Living", "Sports", "Beauty", "Gifts"];
  const [selectedCategory, setSelectedCategory] = useState("Recommended");

  const bestSelling = [
  { id: 1, name: "Ferrero Bouquet", price: "₱1,100", category: "Gifts", image: "/ferrero.jpg"},
  { id: 2, name: "Keychain", price: "₱600", category: "Gifts", image: "/keychain.jpg"},
  { id: 3, name: "Plush Teddy Bear", price: "₱600", category: "Gifts", image: "/teddybear.jpg"},
  { id: 4, name: "Flower Bouquet", price: "₱500", category: "Gifts", image: "/flowerbouquet.jpg"},
  { id: 5, name: "Chocolate Box", price: "₱400", category: "Gifts", image: "/chocolatebox.jpg"},
];

const allProducts = [
  ...bestSelling,
  { id: 6, name: "Hair Clamps", price: "₱25", category: "Fashion", image: "/hairclamps.jpg"},
  { id: 7, name: "Socks", price: "₱50", category: "Fashion", image: "/socks.jpg"},
  { id: 8, name: "Phone Case", price: "₱150", category: "Electronics", image: "/phonecase.jpg"},
  { id: 9, name: "Hand Bag", price: "₱30", category: "Gifts", image: "/handbag.jpg"},
  { id: 10, name: "Wallet", price: "₱200", category: "Fashion", image: "/wallet.jpg"},
  { id: 11, name: "Backpack", price: "₱500", category: "Fashion", image: "/backpack.jpg"},
  { id: 12, name: "Sunglasses", price: "₱300", category: "Fashion", image: "/sunglasses.jpg"},
];

  const filteredProducts =
    selectedCategory === "Recommended"
      ? allProducts
      : allProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <>

      {/* Announcement Banner */}
        <div className="announcement">
      <img
        src="/banner.gif"
        alt="Announcement Banner"
      />
    
        </div>

      <div className="home-container">

        {/* Top 3 Best Selling */}
        <section className="section">
          <h2>Top 5 Best Selling</h2>
          <div className="product-row">
            {bestSelling.map((item) => (
              <ProductCard key={item.id} product={item} />
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
            filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          )}
        </div>
      </section>

      </div>
    </>
  );
};

export default Home;