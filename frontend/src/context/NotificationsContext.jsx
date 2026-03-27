import React, { createContext, useState } from "react";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  // ✅ Seed demo notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Favorite", message: "Hanji added your product to their favorites.", read: false, time: new Date("2026-03-17T10:00:00") },
    { id: 2, title: "New Product", message: "Syntyche posted a new product.", read: false, time: new Date("2026-03-17T08:00:00") },
    { id: 3, title: "Favorite", message: "Shandie added your product to their favorites.", read: false, time: new Date("2026-03-16T15:00:00") },
    { id: 4, title: "New Product", message: "Jomar posted a new product.", read: false, time: new Date("2026-03-16T12:00:00") },
    { id: 5, title: "Favorite", message: "Cypress added your product to their favorites.", read: false, time: new Date("2026-03-15T18:00:00") },
    { id: 6, title: "New Product", message: "Kurt posted a new product.", read: false, time: new Date("2026-03-15T14:00:00") },
    { id: 7, title: "Favorite", message: "Nikka added your product to their favorites.", read: false, time: new Date("2026-03-14T20:00:00") },
    { id: 8, title: "New Product", message: "Kyle posted a new product.", read: false, time: new Date("2026-03-14T10:00:00") },
    { id: 9, title: "Favorite", message: "Bryan added your product to their favorites.", read: false, time: new Date("2026-03-13T16:00:00") },
    { id: 10, title: "New Product", message: "Marjorie posted a new product.", read: false, time: new Date("2026-03-13T09:00:00") },
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications, markAsRead, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};