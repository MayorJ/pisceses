import React from 'react';

function BlogCard({ blog }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card blog-card h-100">
        <img src={blog.image} className="card-img-top" alt={blog.title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-text blog-content">{blog.summary}</p>
          <div className="mt-auto pt-3">
            <a href="#" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;