import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/components/ui/NotificationDetail.css";
import { NotificationsContext } from "../../context/NotificationsContext";

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useContext(NotificationsContext);

  const notif = notifications.find(n => n.id === parseInt(id));

  if (!notif) {
    return (
      <div className="notification-detail">
        <h2>Notification Not Found</h2>
        <button onClick={() => navigate("/notifications")}>Back to Notifications</button>
      </div>
    );
  }

  // Mark as read when opened
  if (!notif.read) {
    markAsRead(notif.id);
  }

  return (
    <div className="notification-detail">
      <h2>{notif.title}</h2>
      <p className="notif-message">{notif.message}</p>
      <p className="notif-time">
        {notif.time.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <button onClick={() => navigate("/notifications")}>Back to Notifications</button>
    </div>
  );
};

export default NotificationDetail;