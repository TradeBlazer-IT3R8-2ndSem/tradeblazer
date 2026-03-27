import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/notifications/Notifications.css";
import { NotificationsContext } from "../../context/NotificationsContext";

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead, removeNotification } = useContext(NotificationsContext);

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const sortedNotifications = [...notifications].sort((a, b) => b.time - a.time);

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

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notif.id);
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