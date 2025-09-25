import React from "react";

const PricingList = () => {
  return (
    <>
      <div className="pricing-container">
        <section className="column">
          <h1>STARTER</h1>
          <h2>$49</h2>
          <h3>1 WEBSITE/YEAR</h3>
          <ul>
            <li>&#10004; Plugin Updates </li>
            <li> &#10004; 100+ Templates </li>
            <li> &#10004; 55+ Field Type </li>
            <li> &#10004; PRO Actions </li>
            <li> &#10004; Conditional Logic </li>
            <li> &#10004; Calculated Fields </li>
            <li> &#10004; Extend with Add Ons </li>
            <li> &#10004; Professional Support </li>
          </ul>
          <button>Buy Now</button>
        </section>

        <section className="column important">
          <p>Best Value</p>
          <h1>FREELANCE</h1>
          <h2>&99</h2>
          <h3>10 WEBSITE/YEAR</h3>
          <ul>
            <li>
              &#10004; Plugin Updates<br></br>
            </li>
            <li>&#10004; 100+ Templates</li>
            <li>&#10004; 55+ Field Type</li>
            <li>&#10004; PRO Actions</li>
            <li>&#10004; Conditional Logic</li>
            <li>&#10004; Calculated Fields</li>
            <li>&#10004; Extend with Add Ons</li>
            <li>&#10004; Professional Support</li>
          </ul>
          <button>Buy Now</button>
        </section>

        <section className="column">
          <h1>PROFESSIONAL</h1>
          <h2>$299</h2>
          <h3>1000 WEBSITE/YEAR</h3>
          <ul>
            <li>&#10004; Plugin Updates</li>
            <li>&#10004; 100+ Templates</li>
            <li>&#10004; 55+ Field Type</li>
            <li>&#10004; PRO Actions</li>
            <li>&#10004; Conditional Logic</li>
            <li>&#10004; Calculated Fields</li>
            <li>&#10004; Extend with Add Ons</li>
            <li>&#10004; Professional Support</li>
          </ul>
          <button>Buy Now</button>
        </section>
      </div>
    </>
  );
};

export default PricingList;
