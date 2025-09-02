// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../CartContext';

function ProductCard({ product }) {
  const { addItemToCart } = useCart();

  return (
    <div className="col-md-4 mb-4">
      <div className="card product-card h-100">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <div className="mt-auto">
            <p className="fw-bold mb-0">${product.price}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;