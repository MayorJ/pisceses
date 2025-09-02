import React, { useState, useEffect } from 'react';
import bgVideo from '../assets/bg.mp4';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    // Fetch Featured Products
    fetch('https://backend-two-alpha-98.vercel.app/api/products?featured=true') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setFeaturedProducts(data))
      .catch(error => console.error('Error fetching featured products:', error));

    // Fetch Featured Blogs
    fetch('http://localhost:3000/api/blogs?featured=true') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setFeaturedBlogs(data))
      .catch(error => console.error('Error fetching featured blogs:', error));
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <main>
      <div className="video-hero-section position-relative overflow-hidden">
        <video autoPlay muted loop playsInline className="video-background">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay d-flex align-items-center justify-content-center">
          <div className="text-center text-white">
            <h1 className="display-1 fw-bold">Welcome to Pisces!</h1>
            <p className="lead mt-4">Indulge in our exquisite collection of handcrafted chocolates and sweet treats.</p>
          </div>
        </div>
      </div>
      
      <section className="featured-products py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-blogs py-5">
        <div className="container">
          <h2 className="text-center mb-4">Latest from Our Blog</h2>
          <div className="row">
            {featuredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;