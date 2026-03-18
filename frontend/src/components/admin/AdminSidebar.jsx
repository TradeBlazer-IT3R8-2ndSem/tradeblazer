import React from 'react';
import '../../styles/components/admin/AdminSidebar.css';

export default function AdminSidebar({ activePanel, setActivePanel }) {
  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      description: 'Dashboard summary & analytics'
    },
    {
      id: 'users',
      label: 'User Management',
      description: 'Manage user accounts'
    },
    {
      id: 'products',
      label: 'Product Management',
      description: 'Manage listings & content'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Send announcements'
    }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-logo">
          <img src="/logo.png" alt="Logo" className="admin-logo-icon" />
          <div>
            <h2>TradeBlazer</h2>
            <p>Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="admin-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`admin-nav-item ${activePanel === item.id ? 'active' : ''}`}
            onClick={() => setActivePanel(item.id)}
            title={item.description}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <div className="admin-nav-text">
              <span className="admin-nav-label">{item.label}</span>
              <span className="admin-nav-desc">{item.description}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user-info">
          <div className="admin-user-avatar">A</div>
          <div className="admin-user-details">
            <p className="admin-user-name">Admin User</p>
            <p className="admin-user-role">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
