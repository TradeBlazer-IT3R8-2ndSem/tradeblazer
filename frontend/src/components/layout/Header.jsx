import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoriesDropdown from "../ui/CategoriesDropdown";
import AccountDropdown from "../ui/AccountDropdown";
import "../../styles/components/layout/Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };
      
  return (
    <header className="header">
      
      {/* LEFT SIDE */}
      <div className="header-left">
        <Link to="/dashboard" className="logo-link">
          <img src="/public/logo.png" alt="TradeBlazer Logo" className="logo-img" />
          <span className="logo-text">TradeBlazer</span>
        </Link>
        <CategoriesDropdown />
      </div>

      {/* CENTER SEARCH */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="header-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
        />  
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right">
        <Link to="/notifications">Notifications</Link>
        <Link to="/favorites">Favorites</Link>
        <AccountDropdown />
      </div>
    </header>
  );
};

export default Header;