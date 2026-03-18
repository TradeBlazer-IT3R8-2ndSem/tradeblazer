import React, { useState } from 'react';
import '../../../styles/pages/admin/panels/OverviewPanel.css';

export default function OverviewPanel() {
  const [stats] = useState({
    totalUsers: 500,
    activeUsers: 450,
    recentLogins: 128,
    activeDevices: 64,
    trendingProducts: 10,
    recentPosts: 15,
    topSellers: 5,
    reportedContent: 12
  });

  const [recentActivity] = useState([
    { id: 1, user: 'Shandie B', action: 'Created new product listing', time: '5 minutes ago' },
    { id: 2, user: 'Syntyche C', action: 'Updated profile information', time: '12 minutes ago' },
    { id: 3, user: 'John D', action: 'Made a purchase', time: '25 minutes ago' },
    { id: 4, user: 'Cypress B', action: 'Posted a message', time: '35 minutes ago' },
    { id: 5, user: 'Jomar L', action: 'Reported a listing', time: '45 minutes ago' },

  ]);

  const StatCard = ({ label, value }) => (
    <div className="stat-card">
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="overview-panel">
      <div className="panel-header">
        <h1>Dashboard Overview</h1>
        <p className="panel-description">Welcome to the TradeBlazer admin panel</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="Recent Logins" value={stats.recentLogins} />
        <StatCard label="Active Devices" value={stats.activeDevices} />
        <StatCard label="Trending Products" value={stats.trendingProducts} />
        <StatCard label="Recent Posts" value={stats.recentPosts} />
        <StatCard label="Top Sellers" value={stats.topSellers} />
        <StatCard label="Reported Content" value={stats.reportedContent} />
      </div>

      <div className="overview-sections">
        <div className="recent-activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <a href="#" className="view-all">View All →</a>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-user"><strong>{activity.user}</strong></p>
                  <p className="activity-action">{activity.action}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
