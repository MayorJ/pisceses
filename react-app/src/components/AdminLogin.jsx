import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded password for now. We'll build a real backend later.
    if (password === 'admin123') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <main className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary admin-btn">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;