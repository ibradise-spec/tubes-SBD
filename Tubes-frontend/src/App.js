import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';

// Layout
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RevokeAccess from './pages/RevokeAccess';
import Error403 from './pages/Error403';

// Management Pages
import CustomerManagement from './components/Management/CustomerManagement';
import MenuManagement from './components/Management/MenuManagement';
import SupplyManagement from './components/Management/SupplyManagement';
import TransactionManagement from './components/Management/TransactionManagement';
import UserManagement from './components/Management/UserManagement';
import InventoryReport from './pages/InventoryReport';
import DeliveryManagement from './pages/DeliveryManagement';

// CSS
import './styles/App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main Layout Component
const MainLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Management Pages */}
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/supply" element={<SupplyManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
            <Route path="/reports/inventory" element={<InventoryReport />} />
            <Route path="/delivery" element={<DeliveryManagement />} />
            
            {/* Admin Pages */}
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/revoke" element={<RevokeAccess />} />
            
            {/* Reports */}
            <Route path="/reports" element={<ReportsPage />} />
            
            {/* Other Pages */}
            <Route path="/add-menu" element={<AddMenuItemPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/manage-users" element={<UserManagement />} />
            
            {/* Error Page */}
            <Route path="/403" element={<Error403 />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Placeholder Components
function ReportsPage() { 
  return (
    <div className="page-container">
      <h1><i className="fas fa-chart-bar"></i> Reports</h1>
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Sales Report</h3>
          <p>View detailed sales analytics</p>
          <button className="btn-view">View Report</button>
        </div>
        
        <div className="report-card">
          <div className="report-icon">
            <i className="fas fa-box"></i>
          </div>
          <h3>Inventory Report</h3>
          <p>Stock levels and movement</p>
          <button className="btn-view">View Report</button>
        </div>
        
        <div className="report-card">
          <div className="report-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>User Activity</h3>
          <p>Login and activity logs</p>
          <button className="btn-view">View Report</button>
        </div>
        
        <div className="report-card">
          <div className="report-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <h3>Financial Summary</h3>
          <p>Revenue and expenses</p>
          <button className="btn-view">View Report</button>
        </div>
      </div>
    </div>
  ); 
}

function AddMenuItemPage() { 
  return (
    <div className="page-container">
      <h1><i className="fas fa-plus-circle"></i> Add Menu Item</h1>
      <p>Add Menu Item page is under development</p>
    </div>
  ); 
}

function InventoryPage() { 
  return (
    <div className="page-container">
      <h1><i className="fas fa-boxes"></i> Inventory</h1>
      <p>Inventory page is under development</p>
    </div>
  ); 
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;