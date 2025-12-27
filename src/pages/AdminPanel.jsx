import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserManagement from '../components/Management/UserManagement';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';

const AdminPanel = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="users" element={<UserManagement />} />
            {/* Add other admin routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;