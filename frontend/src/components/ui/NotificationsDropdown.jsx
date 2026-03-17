import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/ui/NotificationsDropdown.css";

const NotificationsDropdown = () => {
  const navigate = useNavigate();
  const names = ["Hanji", "Syntyche", "Shandie", "Jomar", "Cypress", "Kurt", "Nikka", "Kyle", "Bryan", "Marjorie"];

  const [notifications, setNotifications] = useState([
    { id: 2, title: "Favorite", message: `${names[0]} added your product to their favorites.`, read: false, time: new Date("2026-03-17T10:00:00") },
    { id: 3, title: "New Product", message: `${names[1]} posted a new product.`, read: false, time: new Date("2026-03-17T08:00:00") },
    { id: 4, title: "Favorite", message: `${names[2]} added your product to their favorites.`, read: false, time: new Date("2026-03-16T15:00:00") },
    { id: 5, title: "New Product", message: `${names[3]} posted a new product.`, read: false, time: new Date("2026-03-16T12:00:00") },
    { id: 6, title: "Favorite", message: `${names[4]} added your product to their favorites.`, read: false, time: new Date("2026-03-15T18:00:00") },
    { id: 7, title: "New Product", message: `${names[5]} posted a new product.`, read: false, time: new Date("2026-03-15T14:00:00") },
  ]);

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const sortedNotifications = notifications
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  
  const handleSeeMore = () => {
    navigate("/notifications");
  };

  return (
    <div className="notifications-hover-container">
      <span className="notification-title">
        Notifications
        <span className="badge-count">{notifications.filter(n => !n.read).length}</span>
      </span>

      {/* Dropdown appears below the word like categories */}
      <div className="notifications-dropdown">
        {sortedNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-item ${notif.read ? "read" : "unread"}`}
            onClick={() => handleNotificationClick(notif)}
          >
            <div className="notification-content">
              <div className="badge">{notif.title[0]}</div>
              <div>
                <div className="notification-top">
                  <strong>{notif.title}</strong>
                  <span>{timeAgo(notif.time)}</span>
                </div>
                <p>{notif.message}</p>
              </div>
            </div>
          </div>
        ))}

        {notifications.length > 5 && (
          <div className="see-more-btn" onClick={handleSeeMore}>
            See More
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;