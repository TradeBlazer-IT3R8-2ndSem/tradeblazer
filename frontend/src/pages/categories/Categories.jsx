import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryBox from '../../components/ui/CategoryBox';
import ProductCard from '../../components/ui/ProductCard';
import '../../styles/pages/categories/Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home & Living', slug: 'home' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Gifts', slug: 'gifts' },
  ];

  const allProducts = [
    { id: 1, name: "Ferrero Bouquet", price: "₱1,100", category: "Gifts", image: "/ferrero.jpg", seller: "TradeBlazer" },
    { id: 2, name: "Keychain", price: "₱600", category: "Gifts", image: "/keychain.jpg", seller: "TradeBlazer" },
    { id: 3, name: "Plush Teddy Bear", price: "₱600", category: "Gifts", image: "/teddybear.jpg", seller: "TradeBlazer" },
    { id: 4, name: "Flower Bouquet", price: "₱500", category: "Gifts", image: "/flowerbouquet.jpg", seller: "TradeBlazer" },
    { id: 5, name: "Chocolate Box", price: "₱400", category: "Gifts", image: "/chocolatebox.jpg", seller: "TradeBlazer" },
    { id: 6, name: "Hair Clamps", price: "₱25", category: "Fashion", image: "/hairclamps.jpg", seller: "TradeBlazer" },
    { id: 7, name: "Socks", price: "₱50", category: "Fashion", image: "/socks.jpg", seller: "TradeBlazer" },
    { id: 8, name: "Phone Case", price: "₱150", category: "Electronics", image: "/phonecase.jpg", seller: "TradeBlazer" },
    { id: 9, name: "Hand Bag", price: "₱30", category: "Gifts", image: "/handbag.jpg", seller: "TradeBlazer" },
    { id: 10, name: "Wallet", price: "₱200", category: "Fashion", image: "/wallet.jpg", seller: "TradeBlazer" },
    { id: 11, name: "Backpack", price: "₱500", category: "Fashion", image: "/backpack.jpg", seller: "TradeBlazer" },
    { id: 12, name: "Sunglasses", price: "₱300", category: "Fashion", image: "/sunglasses.jpg", seller: "TradeBlazer" },
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const handleViewDetails = (product) => {
    navigate(`/category/${product.category.toLowerCase().replace(' & ', '').replace(' ', '')}`);
  };

  const getProductsByCategory = (categoryName) => {
    return allProducts.filter(product => product.category === categoryName);
  };

  return (
    <div className="categories-page">
      <h1>All Categories</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryBox
            key={cat.slug}
            name={cat.name}
            onClick={() => handleCategoryClick(cat.slug)}
          />
        ))}
      </div>
      
      <div className="categories-sections">
        {categories.map((cat) => {
          const categoryProducts = getProductsByCategory(cat.name);
          return (
            <div key={cat.slug} className="category-section">
              <h2 className="category-title">{cat.name}</h2>
              {categoryProducts.length > 0 ? (
                <div className="products-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={() => handleViewDetails(product)} />
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