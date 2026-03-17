import { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import OverviewPanel from './panels/Overview';
import UserManagement from './panels/UserManagement';
import ProductManagement from './panels/ProductManagement';
import NotificationPanel from './panels/NotificationPanel';
import '../../styles/pages/admin/AdminDashboard.css';

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPanel = () => {
    switch (activePanel) {
      case 'overview':
        return <OverviewPanel />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'notifications':
        return <NotificationPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className={'admin-dashboard ' + (isSidebarOpen ? 'sidebar-open' : '')}>
      <AdminSidebar 
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="admin-main-content">
        {renderPanel()}
      </main>
    </div>
  );
}
