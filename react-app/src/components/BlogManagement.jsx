import React, { useState, useEffect } from 'react';

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', content: '', image: '', category: '', author: '', isFeatured: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch('http://localhost:3000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
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
    const url = isEditing ? `http://localhost:3000/api/blogs/${editingId}` : 'http://localhost:3000/api/blogs';
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
        fetchBlogs();
        setForm({ title: '', summary: '', content: '', image: '', category: '', author: '', isFeatured: false });
        setIsEditing(false);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setIsEditing(true);
    setEditingId(blog._id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/blogs/${id}`, { method: 'DELETE' })
      .then(() => fetchBlogs())
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h3>Manage Blog Posts</h3>
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
        <h4>{isEditing ? 'Edit Blog' : 'Add New Blog'}</h4>
        <div className="mb-3">
          <input type="text" name="title" className="form-control" placeholder="Title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="summary" className="form-control" placeholder="Summary" value={form.summary} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <textarea name="content" className="form-control" placeholder="Content" value={form.content} onChange={handleChange} required></textarea>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input type="text" name="image" className="form-control" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="category" className="form-control" placeholder="Category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="author" className="form-control" placeholder="Author" value={form.author} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="isFeatured" className="form-check-input" checked={form.isFeatured} onChange={handleChange} />
          <label className="form-check-label">Is Featured?</label>
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? 'Update Blog' : 'Add Blog'}</button>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td><img src={blog.image} alt={blog.title} style={{ width: '50px' }} /></td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.isFeatured ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(blog)} className="btn btn-warning btn-sm me-2">Edit</button>
                  <button onClick={() => handleDelete(blog._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogManagement;