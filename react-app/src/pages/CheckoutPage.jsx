import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      items: cart.map(item => ({
        productId: item._id, // Assumes your product has a _id field
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    };

    try {
      const response = await fetch('https://backend-two-alpha-98.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/'); // Redirect to home page
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-5">Checkout</h1>
        <div className="row">
          <div className="col-lg-6">
            <h4 className="mb-4">Shipping Information</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" name="customerName" placeholder="Full Name" value={formData.customerName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <textarea className="form-control" name="address" placeholder="Shipping Address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-success btn-lg d-block w-100">
                Place Order (${totalAmount.toFixed(2)})
              </button>
            </form>
          </div>
          <div className="col-lg-6">
            <h4 className="mb-4">Order Summary</h4>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item._id} className="list-group-item d-flex justify-content-between">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Quantity: {item.quantity}</small>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
              Total:
              <span>${totalAmount.toFixed(2)}</span>
            </li>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;