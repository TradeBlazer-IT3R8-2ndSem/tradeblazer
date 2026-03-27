import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/categories/", {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();
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