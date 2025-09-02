import React from 'react';

function AboutPage() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 text-center">
            <h1 className="display-3 fw-bold mb-4 text-center">About Our Company</h1>
            <p className="lead">Welcome to Pisces, your destination for exquisite and handcrafted delights. We believe that every bite should be a moment of pure bliss. Our journey began with a simple passion: to create chocolates and sweets that are not only delicious but also works of art.</p>
            <p>Using only the finest ethically sourced ingredients, our team of skilled artisans pours their heart and soul into every creation. From the rich, dark chocolates to the delicate pastries, we are committed to quality and excellence in everything we do. Thank you for joining us on this sweet adventure.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <img src="https://via.placeholder.com/800x400.png?text=Our+Team" className="img-fluid rounded-3 shadow-lg" alt="Our team at Pisces" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;