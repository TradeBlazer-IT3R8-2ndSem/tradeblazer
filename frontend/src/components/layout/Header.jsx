import { Link } from "react-router-dom";
import CategoriesDropdown from "../ui/CategoriesDropdown";
import AccountDropdown from "../ui/AccountDropdown";
import "../../styles/components/layout/Header.css";

const Header = () => {
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