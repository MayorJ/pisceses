import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ProductManagement from '../components/ProductManagement';
import BlogManagement from '../components/BlogManagement';
import OrderManagement from '../components/OrderManagement'; // This import was missing

function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'blogs':
        return <BlogManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Product Management
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              Blog Management
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order Management
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="tab-content">
            {renderContent()}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminPage;