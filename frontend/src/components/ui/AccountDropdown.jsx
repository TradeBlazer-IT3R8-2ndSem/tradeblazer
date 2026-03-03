import { Link } from "react-router-dom";
import { useState } from "react";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);

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
          <Link to="/logout">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;