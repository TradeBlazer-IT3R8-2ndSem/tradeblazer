import { Link } from "react-router-dom";
import "../../styles/components/layout/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">TradeBlazer</div>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="header-search"
        />
      </div>

      <div className="header-right">
        <Link to="/dashboard">Home</Link>
        <Link to="/notifications">Notification</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/support">Help</Link>
        <Link to="/profile">Profile</Link>

        <Link to="/post/add" className="post-button">
          + Post Item
        </Link>
      </div>
    </header>
  );
};

export default Header;