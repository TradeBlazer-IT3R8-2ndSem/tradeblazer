import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div
      className="dropdown-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="dropdown-trigger">
        My Account ▾
      </span>

      {open && (
        <div className="dropdown-menu">
          <Link to="/profile">My Profile</Link>
          <Link to="/support">Help</Link>
          <button onClick={handleLogout} className="dropdown-link">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;