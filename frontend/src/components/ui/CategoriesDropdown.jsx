import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/api";

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

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
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`}>
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;