import React, { useState } from 'react';
import '../../../styles/pages/admin/panels/NotificationPanel.css';

export default function NotificationPanel() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', content: 'Scheduled maintenance on March 20, 2025', date: '2025-03-10', status: 'sent' },
    { id: 2, title: 'New Features Available', content: 'Check out our newly added product filters', date: '2025-03-08', status: 'sent' },
    { id: 3, title: 'Security Update', content: 'Please update your password', date: '2025-03-05', status: 'sent' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recipient: 'all'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title: formData.title,
      content: formData.content,
      date: new Date().toISOString().split('T')[0],
      status: 'sent'
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', recipient: 'all' });
    setIsFormOpen(false);
    alert('Announcement sent successfully!');
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <h1>Notifications & Announcements</h1>
        <p className="panel-description">Send campus-wide announcements to all users</p>
      </div>

      <div className="announcement-form-section">
        {!isFormOpen ? (
          <button 
            className="btn-new-announcement"
            onClick={() => setIsFormOpen(true)}
          >
            + Create New Announcement
          </button>
        ) : (
          <div className="announcement-form">
            <h3>Send New Announcement</h3>
            <form onSubmit={handleSendAnnouncement}>
              <div className="form-group">
                <label htmlFor="title">Announcement Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., System Maintenance Notice"
                  className="form-input"
                  maxLength={100}
                />
                <span className="char-count">{formData.title.length}/100</span>
              </div>

              <div className="form-group">
                <label htmlFor="content">Announcement Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter the announcement message..."
                  className="form-textarea"
                  rows="6"
                  maxLength={500}
                />
                <span className="char-count">{formData.content.length}/500</span>
              </div>

              <div className="form-group">
                <label htmlFor="recipient">Send To</label>
                <select
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="faculty">Faculty & Staff</option>
                  <option value="active">Active Users Only</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-send"
                >
                  Send Announcement
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="announcements-list-section">
        <h3>Recent Announcements</h3>
        <div className="announcements-list">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-card">
                <div className="announcement-header">
                  <div>
                    <h4>{announcement.title}</h4>
                    <p className="announcement-date"> {announcement.date}</p>
                  </div>
                  <span className={`status-badge ${announcement.status}`}>
                    {announcement.status === 'sent' ? '✓ Sent' : announcement.status}
                  </span>
                </div>
                <p className="announcement-content">{announcement.content}</p>
                <div className="announcement-footer">
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    title="Delete announcement"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-announcements">No announcements yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
