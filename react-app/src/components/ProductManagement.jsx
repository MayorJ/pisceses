import React, { useState, useEffect } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', isFeatured: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:3000/api/products/${editingId}` : 'http://localhost:3000/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        fetchProducts();
        setForm({ name: '', description: '', price: '', image: '', category: '', isFeatured: false });
        setIsEditing(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' })
      .then(() => fetchProducts())
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h3>Manage Products</h3>
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
        <h4>{isEditing ? 'Edit Product' : 'Add New Product'}</h4>
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} required></textarea>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="number" name="price" className="form-control" placeholder="Price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="image" className="form-control" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="text" name="category" className="form-control" placeholder="Category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="col">
            <div className="form-check mt-2">
              <input type="checkbox" name="isFeatured" className="form-check-input" checked={form.isFeatured} onChange={handleChange} />
              <label className="form-check-label">Is Featured?</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.isFeatured ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="btn btn-warning btn-sm me-2">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;