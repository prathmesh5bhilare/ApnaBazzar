import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
    <div className="topbar">Free delivery on orders above <b>₹999</b>. Use code <b>APNA10</b> for 10% off.</div>
    <header className="navbar">
      <Link to="/" className="logo">Apna<span>Bazzar</span></Link>

      <form className="search" onSubmit={handleSearch}>
        <input
          placeholder="Search cosmetics and jewellery"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/deals">Deals</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart <span key={totalItems} className="badge">{totalItems}</span>
        </NavLink>
      </nav>
    </header>
    </>
  );
}
