import Header from "../../components/layout/Header";
import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import "../../styles/pages/dashboard/Home.css";

const Home = () => {
  const categories = ["Food", "Clothing", "Gadgets", "Accessories"];

  const bestSelling = [
    { id: 1, name: "Ferrero Bouquet", price: "₱1,100", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Cake with Bows", price: "₱600", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Plush Teddy Bear", price: "₱600", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  ];

  const allProducts = [
    ...bestSelling,
    { id: 6, name: "Hair Clamps", price: "₱25", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  ];

  return (
    <>
  

      <div className="home-container">

        {/* Announcement Banner */}
        <div className="announcement">
         <p> diri ang announcement banner </p>
         <p> ambot </p>
         <p> pics</p>
         <p> ambot </p>
         <p> ambot </p>
         <p> ambot </p>
         <p> ambot </p>
         
    
        </div>

        {/* Categories */}
        <section className="section">
          <h2>Categories</h2>
          <div className="category-row">
            {categories.map((cat, index) => (
              <CategoryBox key={index} name={cat} />
            ))}
          </div>
        </section>

        {/* Top 3 Best Selling */}
        <section className="section">
          <h2>Top 3 Best Selling</h2>
          <div className="product-row">
            {bestSelling.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="section">
          <h2>All Products</h2>
          <div className="product-grid">
            {allProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;