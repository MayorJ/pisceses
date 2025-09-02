import React, { useState } from 'react';
import ProductManagement from '../components/ProductManagement';
import BlogManagement from '../components/BlogManagement';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-5">Admin Dashboard</h1>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Manage Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              Manage Blogs
            </button>
          </li>
        </ul>

        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'blogs' && <BlogManagement />}
        
      </div>
    </main>
  );
}

export default AdminPage;