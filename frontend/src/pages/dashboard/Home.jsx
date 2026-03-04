import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import CategoryBox from "../../components/ui/CategoryBox";
import "../../styles/pages/dashboard/Home.css";
import { getCategories, getPosts } from "../../services/api";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const catData = await getCategories();
        setCategories(catData);

        const postData = await getPosts();
        setPosts(postData);

        // Example: pick top 5 (later sort by sales/favorites)
        setBestSelling(postData.slice(0, 5));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="home-container">
      {/* Top 5 Best Selling */}
      <section className="section">
        <h2>Top 5 Best Selling</h2>
        <div className="product-row">
          {bestSelling.map((item) => (
           <ProductCard
            key={item.id}
              product={{
                name: item.title,
                price: `₱${item.price}`,
                category: item.category?.name || "Uncategorized",
                image: item.image || "https://via.placeholder.com/150"
              }}/>

          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2>Categories</h2>
        <div className="category-row">
          {categories.map((cat) => (
            <CategoryBox key={cat.id} name={cat.name} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="section">
        <h2>All Products</h2>
        <div className="product-grid">
          {posts.map((item) => (
            <ProductCard key={item.id} product={{
              name: item.title,
              price: `₱${item.price}`,
              category: item.category?.name || "Uncategorized",
              image: item.image || "https://via.placeholder.com/150"
            }} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;