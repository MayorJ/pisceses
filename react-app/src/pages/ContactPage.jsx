import React from 'react';

function ContactPage() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <h1 className="display-3 fw-bold mb-4 text-center">Get in Touch</h1>
            <p className="text-center lead">We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
            <form className="p-4 rounded-3 shadow-lg">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="5" required></textarea>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;