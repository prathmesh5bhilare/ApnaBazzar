import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <h2>About ApnaBazzar</h2>
      <p>
        ApnaBazzar is an online store for cosmetics and jewellery. Explore makeup, skincare, fragrances,
        necklaces, earrings and rings, add your favourites to the cart and place your order with ease.
      </p>
      <div className="trust">
        <div><b>Authentic Products</b>genuine skincare, cosmetics and jewellery</div>
        <div><b>Cash on Delivery</b>pay when it arrives</div>
        <div><b>Easy Returns</b>7 day return policy</div>
        <div><b>Secure Checkout</b>your details are safe</div>
      </div>
      <p>Questions? Write to <b>support@apnabazzar.com</b></p>
      <Link to="/products" className="btn">Start Shopping</Link>
    </div>
  );
}
