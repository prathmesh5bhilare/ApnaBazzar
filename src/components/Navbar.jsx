import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  Sparkles,
  Menu,
  ShieldCheck,
  Truck,
  Tag,
  ArrowRight
} from "lucide-react";
import { useCart } from "./CartContext";
import { products } from "./products";

export default function Navbar() {
  const { totalItems, wishlist, totalPrice } = useCart();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsFocused(false);
  }, [location.pathname, location.search]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery("");
    setIsFocused(false);
    navigate(`/products/${item.id}`);
  };

  // Filter top matches for live dropdown
  const suggestions = query.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const quickPicks = ["Lipsticks", "Choker", "Jhumkas", "Foundation", "Solitaire", "Bangles"];

  return (
    <>
      {/* Top Banner Announcement Strip */}
      <aside className="topbar" aria-label="Announcement">
        <div className="topbar-inner">
          <div className="topbar-item">
            <Truck size={14} />
            <span>Free Express Delivery above <b>₹999</b></span>
          </div>
          <div className="topbar-divider">•</div>
          <div className="topbar-item">
            <Tag size={14} />
            <span>Use code <b>APNA10</b> for extra 10% OFF</span>
          </div>
          <div className="topbar-divider desktop-only">•</div>
          <div className="topbar-item desktop-only">
            <ShieldCheck size={14} />
            <span>100% Authentic & Certified Products</span>
          </div>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <header className="navbar">
        <div className="nav-container">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <div className="logo-sparkle">
              <Sparkles size={20} />
            </div>
            <div className="logo-text-group">
              <span className="brand-name">Apna<span>Bazzar</span></span>
              <span className="brand-sub">LUXURY BEAUTY & JEWELLERY</span>
            </div>
          </Link>

          {/* Interactive Search Bar */}
          <div className="search-wrapper" ref={searchRef}>
            <form className="search-form" onSubmit={handleSearch}>
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search cosmetics, bridal jewellery, lipsticks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isFocused && (
              <div className="search-dropdown">
                {suggestions.length > 0 ? (
                  <div className="suggestions-list">
                    <div className="dropdown-heading">Matching Products</div>
                    {suggestions.map((p) => (
                      <div
                        key={p.id}
                        className="suggestion-item"
                        onMouseDown={() => handleSuggestionClick(p)}
                      >
                        <img src={p.image} alt="" className="suggestion-thumb" />
                        <div className="suggestion-info">
                          <span className="suggestion-name">{p.name}</span>
                          <span className="suggestion-meta">
                            {p.category} · <b>₹{p.price.toLocaleString("en-IN")}</b>
                          </span>
                        </div>
                        <ArrowRight size={14} className="suggestion-arrow" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="quick-tags">
                    <div className="dropdown-heading">Trending Searches</div>
                    <div className="quick-tag-chips">
                      {quickPicks.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="quick-tag-chip"
                          onMouseDown={() => {
                            setQuery(tag);
                            navigate(`/products?q=${encodeURIComponent(tag)}`);
                            setIsFocused(false);
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <NavLink to="/" end className="nav-item">
              Home
            </NavLink>
            <NavLink to="/products" className="nav-item">
              All Products
            </NavLink>
            <NavLink to="/products?cat=Cosmetics" className="nav-item">
              Cosmetics
            </NavLink>
            <NavLink to="/products?cat=Jewellery" className="nav-item">
              Jewellery
            </NavLink>
            <NavLink to="/deals" className="nav-item deals-nav">
              <span className="fire-emoji">🔥</span> Deals
            </NavLink>
            <NavLink to="/about" className="nav-item">
              About
            </NavLink>
          </nav>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="nav-actions">
            <Link
              to="/products?filter=wishlist"
              className="action-icon-btn wishlist-icon-btn"
              title="View Wishlist"
            >
              <Heart size={21} />
              {wishlist.length > 0 && (
                <span className="action-badge wishlist-badge">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="action-cart-btn" title="View Cart">
              <div className="cart-icon-wrap">
                <ShoppingBag size={21} />
                {totalItems > 0 && (
                  <span className="action-badge cart-badge">{totalItems}</span>
                )}
              </div>
              <div className="cart-text-group desktop-only">
                <span className="cart-label">My Cart</span>
                <span className="cart-amount">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
