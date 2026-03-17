import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/notifications/Notifications.css";

const Notifications = () => {

  const names = ["Hanji", "Syntyche", "Shandie", "Jomar", "Cypress", "Kurt", "Nikka", "Kyle", "Bryan", "Marjorie"];

  const [notifications, setNotifications] = useState([
    { id: 2, title: "Favorite", message: `${names[0]} added your product to their favorites.`, read: false, time: new Date("2026-03-17T10:00:00") },
    { id: 3, title: "New Product", message: `${names[1]} posted a new product.`, read: false, time: new Date("2026-03-17T08:00:00") },
    { id: 4, title: "Favorite", message: `${names[2]} added your product to their favorites.`, read: false, time: new Date("2026-03-16T15:00:00") },
    { id: 5, title: "New Product", message: `${names[3]} posted a new product.`, read: false, time: new Date("2026-03-16T12:00:00") },
    { id: 6, title: "Favorite", message: `${names[4]} added your product to their favorites.`, read: false, time: new Date("2026-03-15T18:00:00") },
    { id: 7, title: "New Product", message: `${names[5]} posted a new product.`, read: false, time: new Date("2026-03-15T14:00:00") },
    { id: 8, title: "Favorite", message: `${names[6]} added your product to their favorites.`, read: false, time: new Date("2026-03-14T20:00:00") },
    { id: 9, title: "New Product", message: `${names[7]} posted a new product.`, read: false, time: new Date("2026-03-14T10:00:00") },
    { id: 10, title: "Favorite", message: `${names[8]} added your product to their favorites.`, read: false, time: new Date("2026-03-13T16:00:00") },
    { id: 11, title: "New Product", message: `${names[9]} posted a new product.`, read: false, time: new Date("2026-03-13T09:00:00") },
  ]);

  // Helper: convert Date to "time ago" format
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Sort notifications: pinned first, then most recent first
  const sortedNotifications = [
    ...notifications.filter((n) => n.pinned),
    ...notifications
      .filter((n) => !n.pinned)
      .sort((a, b) => b.time - a.time)
  ];

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    navigate(`/notifications/${notif.id}`);
  };

  return (
    <div className="notifications-page">
      <div className="notifications-card">
        <div className="notifications-header">
          <div>
            <p className="section-label">Activity</p>
            <h2>Notifications</h2>
          </div>
        </div>

        {sortedNotifications.length === 0 ? (
          <div className="empty-state">
            <h3>No Notifications</h3>
            <p>You're all caught up. New notifications will appear here.</p>
          </div>
        ) : (
          <div className="notification-list">
            {sortedNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`notification-item ${notif.read ? "read" : "unread"} ${notif.pinned ? "pinned" : ""}`}
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

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering notification click
                    setNotifications((prev) =>
                      prev.filter((n) => n.id !== notif.id)
                    );
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;