import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(100); // Max price set to 100
  const [inStockOnly, setInStockOnly] = useState(false); // Checkbox state

  useEffect(() => {
    fetch('https://backend-two-alpha-98.vercel.app/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    const matchesStock = !inStockOnly || product.inStock; // Assumes your model has an 'inStock' field
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-5">Our Products</h1>
        <div className="row mb-4 align-items-center">
          <div className="col-md-4 mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3 mb-3">
            <select 
              className="form-select" 
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              <option value="Bars">Bars</option>
              <option value="Gift Boxes">Gift Boxes</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="priceRange" className="form-label">Price: ${priceRange}</label>
            <input 
              type="range" 
              className="form-range" 
              id="priceRange" 
              min="0" 
              max="100" 
              value={priceRange}
              onChange={handlePriceChange}
            />
          </div>
          <div className="col-md-2 mb-3">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="inStockOnly"
                checked={inStockOnly}
                onChange={handleStockChange}
              />
              <label className="form-check-label" htmlFor="inStockOnly">
                In Stock
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;