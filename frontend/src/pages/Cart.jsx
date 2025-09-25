import React from "react";

const CartPage = () => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        {/* Cart Items Section */}
        <div className="cart-items">
          <div className="cart-item">
            <img
              src="https://via.placeholder.com/120"
              alt="Course thumbnail"
              className="cart-thumbnail"
            />
            <div className="cart-details">
              <h3>Course Title</h3>
              <p>Instructor: John Doe</p>
              <p>Level: Beginner</p>
              <p className="price">$49.99</p>
            </div>
            <button className="remove-btn">Remove</button>
          </div>

          <div className="cart-item">
            <img
              src="https://via.placeholder.com/120"
              alt="Course thumbnail"
              className="cart-thumbnail"
            />
            <div className="cart-details">
              <h3>Another Course</h3>
              <p>Instructor: Jane Doe</p>
              <p>Level: Intermediate</p>
              <p className="price">$79.99</p>
            </div>
            <button className="remove-btn">Remove</button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <p>Subtotal: $129.98</p>
          <p>Discount: -$20.00</p>
          <hr />
          <h3>Total: $109.98</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
