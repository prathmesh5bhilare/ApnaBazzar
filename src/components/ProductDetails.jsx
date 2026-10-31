import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  Truck,
  ShieldCheck,
  Undo2,
  Heart,
  ShoppingBag,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Share2
} from "lucide-react";
import { getProductById, products } from "./products";
import { useCart, FREE_DELIVERY_ABOVE } from "./CartContext";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    setLoading(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Loading luxury product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="empty-catalog">
        <p className="error">{error || "Product not found"}</p>
        <Link to="/products" className="btn-primary">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const isLiked = isInWishlist(product.id);
  const reviewsCount = ((product.id * 137) % 850) + 120;

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeResult({
        success: true,
        text: `Standard Delivery in 2-3 Days to ${pincode.trim()} via Express Courier. Cash on Delivery is available!`,
      });
    } else {
      setPincodeResult({
        success: false,
        text: "Please enter a valid 6-digit Indian PIN code.",
      });
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/products?cat=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="details-layout">
        {/* Left Column: Image & Badges */}
        <div className="details-gallery">
          <div className="main-image-frame">
            <ProductImage product={product} className="details-pimg" />
            <button
              type="button"
              className={`details-wishlist-btn ${isLiked ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Save to Wishlist"
            >
              <Heart size={22} fill={isLiked ? "#e11d48" : "none"} color={isLiked ? "#e11d48" : "#4b5563"} />
            </button>
            {product.discount > 0 && (
              <span className="details-discount-pill">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="guarantee-badges-strip">
            <div className="guarantee-pill">
              <ShieldCheck size={18} />
              <span>100% Certified Authentic</span>
            </div>
            <div className="guarantee-pill">
              <Undo2 size={18} />
              <span>7-Day Return Guarantee</span>
            </div>
            <div className="guarantee-pill">
              <Sparkles size={18} />
              <span>Finest Quality Materials</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-info-column">
          <div className="details-header-meta">
            <span className="details-cat-tag">{product.category}</span>
            {product.featured && <span className="details-featured-tag">BESTSELLER</span>}
            <span className="stock-tag">🟢 In Stock · Ready to Ship</span>
          </div>

          <h1 className="details-title">{product.name}</h1>

          {/* Rating Strip */}
          <div className="details-rating-strip">
            <div className="stars-pill">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
            <span className="rating-divider">·</span>
            <span className="reviews-text">{reviewsCount} Verified Customer Ratings</span>
          </div>

          {/* Pricing Box */}
          <div className="details-price-box">
            <div className="price-main-row">
              <span className="details-price">{inr(product.price)}</span>
              <span className="details-mrp">{inr(product.mrp)}</span>
              <span className="details-save">
                You Save {inr(product.mrp - product.price)} ({product.discount}% off)
              </span>
            </div>
            <span className="tax-inclusive">Inclusive of all taxes · Free COD Available</span>
          </div>

          <p className="details-description">{product.description}</p>

          {/* Pincode Delivery Checker */}
          <div className="pincode-box">
            <span className="pincode-label">
              <MapPin size={16} /> Check Delivery & COD Availability
            </span>
            <form className="pincode-form" onSubmit={handleCheckPincode}>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button type="submit">Check</button>
            </form>
            {pincodeResult && (
              <p className={`pincode-msg ${pincodeResult.success ? "success" : "error"}`}>
                {pincodeResult.success && <CheckCircle2 size={15} />} {pincodeResult.text}
              </p>
            )}
          </div>

          {/* Key Perks */}
          <ul className="details-perks-list">
            <li>
              <Truck size={17} />
              <span>
                {product.price >= FREE_DELIVERY_ABOVE
                  ? "Qualifies for Free Express Shipping"
                  : "Add more to cart for Free Shipping (Orders above ₹999)"}
              </span>
            </li>
            <li>
              <ShieldCheck size={17} />
              <span>Safe & Dermatologist / BIS tested materials</span>
            </li>
            <li>
              <Undo2 size={17} />
              <span>Instant refund or replacement within 7 days</span>
            </li>
          </ul>

          {/* Quantity & CTA Buttons */}
          <div className="details-action-area">
            <div className="qty-selector">
              <label>Qty:</label>
              <div className="qty-controls">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  disabled={qty >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn-add-cart-large"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <button
              type="button"
              className="btn-buy-now-large"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <section className="details-tabs-section">
        <div className="tabs-header">
          <button
            type="button"
            className={`tab-btn ${activeTab === "desc" ? "active" : ""}`}
            onClick={() => setActiveTab("desc")}
          >
            Product Overview
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Care & Specifications
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Ratings & Reviews ({reviewsCount})
          </button>
        </div>

        <div className="tab-content-panel">
          {activeTab === "desc" && (
            <div className="tab-pane">
              <h3>About {product.name}</h3>
              <p>{product.description}</p>
              <p>
                Crafted specifically for the discerning customer, this item represents ApnaBazzar's commitment to authentic, luxury lifestyle essentials. Every batch undergoes strict quality checks before dispatch.
              </p>
              <ul>
                <li>Category: <b>{product.category}</b></li>
                <li>Authenticity: <b>100% Genuine Certified</b></li>
                <li>Return window: <b>7 calendar days from delivery</b></li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="tab-pane">
              <h3>Care Instructions & Details</h3>
              <div className="specs-table">
                <div className="spec-row">
                  <span>Product Code:</span>
                  <b>AB-{product.id.toString().padStart(4, "0")}</b>
                </div>
                <div className="spec-row">
                  <span>Category:</span>
                  <b>{product.category}</b>
                </div>
                <div className="spec-row">
                  <span>Finish / Material:</span>
                  <b>{product.category === "Jewellery" ? "Premium 18K Polish & Skin-Safe Alloy" : "Dermatologist Tested Skin Formulation"}</b>
                </div>
                <div className="spec-row">
                  <span>Maintenance Tip:</span>
                  <b>Keep away from direct water, perfumes, and chemical sprays. Store in airtight pouch.</b>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-pane">
              <div className="reviews-summary-bar">
                <div className="rating-score-box">
                  <span className="big-rating">{product.rating}</span>
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <small>Based on {reviewsCount} verified reviews</small>
                </div>
                <div className="rating-percentage-bars">
                  <div className="bar-row">
                    <span>5 Star</span>
                    <div className="meter"><div style={{ width: "78%" }}></div></div>
                    <span>78%</span>
                  </div>
                  <div className="bar-row">
                    <span>4 Star</span>
                    <div className="meter"><div style={{ width: "16%" }}></div></div>
                    <span>16%</span>
                  </div>
                  <div className="bar-row">
                    <span>3 Star</span>
                    <div className="meter"><div style={{ width: "4%" }}></div></div>
                    <span>4%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">COMPLETE YOUR LOOK</span>
              <h2 className="section-title">You May Also Like</h2>
            </div>
            <Link to={`/products?cat=${encodeURIComponent(product.category)}`} className="view-all-link">
              See All in {product.category} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
