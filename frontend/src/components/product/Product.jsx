import React from "react";
import "./product.css";

import US from "../../assets/360mind logo.png";

const Product = () => {
  return (
    <section id="product">
      <h5>Learn about our</h5>
      <h2>Product</h2>
      <div className="product-content">
        <h2 className="product-title">
          Your mental health is important – 360 Mind gives you the tools to help
          you improve it
        </h2>
        <p className="product-description">
          Elevate your mental well-being with 360 Mind's innovative digital
          products, placing a special focus on our standout feature - the Mood
          Diary. Our commitment is to provide you with tools that go beyond
          conventional solutions. The Mood Diary is your personal space for
          self-reflection and emotional well-being.
        </p>
      </div>
      <div className="product-image">
        <img src={US} alt="US" />
      </div>
    </section>
  );
};

export default Product;
