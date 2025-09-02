import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeItemFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-5">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="lead">Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cart.map((item) => (
                <div key={item._id} className="card mb-3 p-3">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3">
                      <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">${item.price}</p>
                        <p className="card-text"><small className="text-muted">Quantity: {item.quantity}</small></p>
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <button 
                        className="btn btn-danger" 
                        onClick={() => removeItemFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card p-4">
                <h4 className="card-title">Order Summary</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Total:</strong>
                    <span>${total.toFixed(2)}</span>
                  </li>
                </ul>
                <div className="mt-4 d-grid gap-2">
                  <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
                  <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;