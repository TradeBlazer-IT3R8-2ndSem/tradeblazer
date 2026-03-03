import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import "../../styles/pages/dashboard/Home.css";

const Home = () => {
  const categories = ["Electronics", "Fashion", "Home & Living", "Sports", "Beauty", "Gifts"];

  const bestSelling = [
  { id: 1, name: "Ferrero Bouquet", price: "₱1,100", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 2, name: "Cake with Bows", price: "₱600", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 3, name: "Plush Teddy Bear", price: "₱600", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 4, name: "Flower Bouquet", price: "₱500", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 5, name: "Chocolate Box", price: "₱400", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
];

const allProducts = [
  ...bestSelling,
  { id: 6, name: "Hair Clamps", price: "₱25", category: "Fashion", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 7, name: "Socks", price: "₱50", category: "Fashion", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 8, name: "Phone Case", price: "₱150", category: "Electronics", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 9, name: "Keychain", price: "₱30", category: "Gifts", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 10, name: "Wallet", price: "₱200", category: "Fashion", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 11, name: "Backpack", price: "₱500", category: "Fashion", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
  { id: 12, name: "Sunglasses", price: "₱300", category: "Fashion", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500&auto=format&fit=crop" },
];

  return (
    <>

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

        {/* Categories */}
        <section className="section">
          <h2>Categories</h2>
          <div className="category-row">
            {categories.map((cat, index) => (
              <CategoryBox key={index} name={cat} />
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