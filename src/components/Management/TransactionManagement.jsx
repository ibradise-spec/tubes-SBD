import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../UI/Pagination';

const TransactionManagement = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([
    { id: 1, transactionId: 'TRX-1001', customer: 'John Doe', amount: 125.50, date: '2024-01-20 14:30', status: 'completed', payment: 'Credit Card', items: 3 },
    { id: 2, transactionId: 'TRX-1002', customer: 'Jane Smith', amount: 89.99, date: '2024-01-20 15:45', status: 'pending', payment: 'Cash', items: 2 },
    { id: 3, transactionId: 'TRX-1003', customer: 'Bob Johnson', amount: 45.75, date: '2024-01-19 12:15', status: 'completed', payment: 'Debit Card', items: 1 },
    { id: 4, transactionId: 'TRX-1004', customer: 'Alice Brown', amount: 210.25, date: '2024-01-18 19:20', status: 'cancelled', payment: 'Credit Card', items: 4 },
    { id: 5, transactionId: 'TRX-1005', customer: 'Charlie Wilson', amount: 67.80, date: '2024-01-18 11:30', status: 'completed', payment: 'Online', items: 2 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleProcessPayment = (id) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, status: 'completed' } : t
    ));
    alert('Payment processed successfully!');
  };

  const handleCancelTransaction = (id) => {
    if (window.confirm('Are you sure you want to cancel this transaction?')) {
      setTransactions(transactions.map(t => 
        t.id === id ? { ...t, status: 'cancelled' } : t
      ));
    }
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = transactions.slice(startIndex, startIndex + itemsPerPage);

  // Calculate statistics
  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Transaction Management 💳</h1>
        <p>Manage customer transactions and payments</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-green)' }}>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>${totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-blue)' }}>
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-content">
            <h3>{transactions.length}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-orange)' }}>
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{pendingTransactions}</h3>
            <p>Pending Payments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent-red)' }}>
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{transactions.filter(t => t.status === 'cancelled').length}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Transaction History</h2>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search transactions..." className="search-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date & Time</th>
                <th>Payment Method</th>
                <th>Items</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <strong>{transaction.transactionId}</strong>
                  </td>
                  <td>{transaction.customer}</td>
                  <td>
                    <strong>${transaction.amount.toFixed(2)}</strong>
                  </td>
                  <td>{transaction.date}</td>
                  <td>
                    <span className="payment-badge">{transaction.payment}</span>
                  </td>
                  <td>{transaction.items} items</td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">
                      <i className="fas fa-eye"></i>
                    </button>
                    {transaction.status === 'pending' && (user.role === 'owner' || user.role === 'cs_manager') && (
                      <button 
                        className="action-btn success"
                        onClick={() => handleProcessPayment(transaction.id)}
                      >
                        <i className="fas fa-check"></i> Process
                      </button>
                    )}
                    {user.role === 'owner' && transaction.status !== 'cancelled' && (
                      <button 
                        className="action-btn delete"
                        onClick={() => handleCancelTransaction(transaction.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {transactions.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Payment Processing Section (for CS Manager) */}
      {user.role === 'cs_manager' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Process New Payment</h2>
          </div>
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name</label>
                <input type="text" className="form-input" placeholder="Enter customer name" />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input type="number" className="form-input" placeholder="0.00" step="0.01" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Payment Method</label>
                <select className="form-input">
                  <option value="cash">Cash</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transaction Type</label>
                <select className="form-input">
                  <option value="dine-in">Dine-in</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-success">
                <i className="fas fa-check-circle"></i> Process Payment
              </button>
              <button className="btn">
                <i className="fas fa-print"></i> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;