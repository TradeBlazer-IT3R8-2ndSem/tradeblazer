import React, { useState } from 'react';
import '../../../styles/pages/admin/panels/UserManagement.css';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John D', email: 'john@gmail.com', role: 'student', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'Shandie B', email: 'shan@gmail.com', role: 'faculty', status: 'active', joinDate: '2024-11-20' },
    { id: 3, name: 'Cypress B', email: 'cypress@gmail.com', role: 'staff', status: 'active', joinDate: '2025-02-10' },
    { id: 4, name: 'Syntyche C', email: 'syntyche@gmail.com', role: 'student', status: 'inactive', joinDate: '2025-01-25' },
    { id: 5, name: 'Jomar A', email: 'jomar@gmail.com', role: 'faculty', status: 'active', joinDate: '2024-12-05' },
  ]);

  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleDeactivate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="user-management-panel">
      <div className="panel-header">
        <h1>User Management</h1>
        <p className="panel-description">Manage user accounts, roles, and permissions</p>
      </div>

      <div className="management-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`user-row ${user.status}`}>
                <td className="user-name">{user.name}</td>
                <td className="user-email">{user.email}</td>
                <td className="user-role">
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td className="user-status">
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'active' ? '✓ Active' : '⊘ Inactive'}
                  </span>
                </td>
                <td className="user-join-date">{user.joinDate}</td>
                <td className="user-actions">
                    
                  <button 
                    className="btn-action btn-toggle"
                    onClick={() => handleDeactivate(user.id)}
                    title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {user.status === 'active' ? '⊘' : '✓'}
                  </button>
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(user.id)}
                    title="Delete user"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>{filteredUsers.length} user(s) displayed</p>
      </div>
    </div>
  );
}
