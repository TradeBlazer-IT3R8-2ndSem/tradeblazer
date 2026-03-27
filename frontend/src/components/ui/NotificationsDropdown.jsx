import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/ui/NotificationsDropdown.css";
import { NotificationsContext } from "../../context/NotificationsContext";

const NotificationsDropdown = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useContext(NotificationsContext);

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const sortedNotifications = [...notifications].sort((a, b) => b.time - a.time).slice(0, 5);

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    navigate(`/notifications/${notif.id}`);
  };

  const handleSeeMore = () => {
    navigate("/notifications");
  };

  return (
    <div className="notifications-hover-container">
      <span className="notification-title" onClick={handleSeeMore}>
        Notifications
        <span className="badge-count">{notifications.filter(n => !n.read).length}</span>
      </span>

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