import { Link } from "react-router-dom";
import { useState } from "react";

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link to="/categories" className="dropdown-trigger">
        Categories ▾
      </Link>

      {open && (
        <div className="dropdown-menu">
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/fashion">Fashion</Link>
          <Link to="/category/home">Home & Living</Link>
          <Link to="/category/sports">Sports</Link>
          <Link to="/category/beauty">Beauty</Link>
          <Link to="/category/gifts">Gifts</Link>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;