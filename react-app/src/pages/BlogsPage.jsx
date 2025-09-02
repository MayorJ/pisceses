import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');

  useEffect(() => {
    fetch('https://backend-two-alpha-98.vercel.app/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesAuthor = selectedAuthor === 'all' || blog.author === selectedAuthor;
    
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-5">Our Blog</h1>
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <select 
              className="form-select" 
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              <option value="Guides">Guides</option>
              <option value="History">History</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <select 
              className="form-select" 
              value={selectedAuthor}
              onChange={handleAuthorChange}
            >
              <option value="all">All Authors</option>
              <option value="Jane Doe">Jane Doe</option>
              <option value="John Smith">John Smith</option>
            </select>
          </div>
        </div>
        <div className="row">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default BlogsPage;