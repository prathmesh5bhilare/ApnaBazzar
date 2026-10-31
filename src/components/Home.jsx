import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Banknote,
  Undo2,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import { products } from "./products";
import ProductCard from "./ProductCard";
import OfferSlider from "./OfferSlider";

const categoriesData = [
  {
    name: "Cosmetics",
    title: "Luxury Cosmetics & Makeup",
    desc: "Matte Lipsticks, Foundations, Eyeshadows & Highlighters",
    img: "/images/cat-cosmetics.jpg",
    itemsCount: 12,
    badge: "Dermatologist Tested",
    link: "/products?cat=Cosmetics",
  },
  {
    name: "Jewellery",
    title: "Handcrafted Fine Jewellery",
    desc: "Kundan Chokers, Gold Plated Chains, Jhumkas & Solitaires",
    img: "/images/cat-jewellery.jpg",
    itemsCount: 12,
    badge: "BIS Hallmarked Look",
    link: "/products?cat=Jewellery",
  },
];

const customerReviews = [
  {
    name: "Pooja Sharma",
    city: "Mumbai",
    rating: 5,
    date: "2 days ago",
    title: "Exceptional finish and fast delivery!",
    comment: "The Matte Lipstick and Kundan Choker exceeded all my expectations. The jewellery has the weight and lustre of real gold, and the lipstick stayed on throughout my cousin's wedding!",
    productName: "Kundan Choker Set",
  },
  {
    name: "Ayesha Khan",
    city: "Delhi NCR",
    rating: 5,
    date: "1 week ago",
    title: "Genuine quality, safe packaging",
    comment: "I was hesitant to buy makeup online, but ApnaBazzar's products are 100% genuine. The Eyeshadow Palette blends like a dream with zero fallout. Super happy!",
    productName: "Eyeshadow Palette 12 Shades",
  },
  {
    name: "Rhea Sen",
    city: "Bengaluru",
    rating: 5,
    date: "3 days ago",
    title: "Stunning Jhumkas & reliable COD",
    comment: "Ordered via Cash on Delivery and arrived in 48 hours in Bangalore. The gold plating is so rich and not yellow at all. Will definitely be a regular customer.",
    productName: "Jhumka Earrings",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  // Live Flash Sale Countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 34, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText("APNA10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const featured = products.filter((p) => p.featured);
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Offer Slider */}
      <OfferSlider />

      {/* Trust & Guarantee Ribbon */}
      <section className="ribbon-bar" aria-label="Store Guarantees">
        <div className="ribbon-item">
          <div className="ribbon-icon"><BadgeCheck size={26} /></div>
          <div className="ribbon-text">
            <strong>100% Authentic</strong>
            <span>Verified genuine quality</span>
          </div>
        </div>
        <div className="ribbon-item">
          <div className="ribbon-icon"><Truck size={26} /></div>
          <div className="ribbon-text">
            <strong>Express Delivery</strong>
            <span>Free on orders over ₹999</span>
          </div>
        </div>
        <div className="ribbon-item">
          <div className="ribbon-icon"><Banknote size={26} /></div>
          <div className="ribbon-text">
            <strong>Cash on Delivery</strong>
            <span>Pay securely at doorstep</span>
          </div>
        </div>
        <div className="ribbon-item">
          <div className="ribbon-icon"><Undo2 size={26} /></div>
          <div className="ribbon-text">
            <strong>7-Day Easy Returns</strong>
            <span>No questions asked policy</span>
          </div>
        </div>
      </section>

      {/* Curated Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">CURATED AISLES</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link to="/products" className="view-all-link">
            Explore All Catalog <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-cards-grid">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="luxury-cat-card"
            >
              <div className="cat-img-wrapper">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="cat-img"
                  loading="lazy"
                />
                <span className="cat-badge-pill">{cat.badge}</span>
              </div>
              <div className="cat-card-body">
                <span className="cat-items-count">{cat.itemsCount} Handcrafted Items</span>
                <h3 className="cat-card-title">{cat.name}</h3>
                <p className="cat-card-desc">{cat.desc}</p>
                <span className="cat-shop-btn">
                  Browse {cat.name} <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner with Live Timer */}
      <section className="flash-sale-strip">
        <div className="flash-sale-content">
          <div className="flash-title-group">
            <span className="flash-badge"><Flame size={16} /> DEAL OF THE DAY</span>
            <h2>Festive Season Grand Discounts</h2>
            <p>Save up to 50% on our bestselling cosmetics & bridal jewellery pieces.</p>
          </div>

          <div className="flash-timer-box">
            <span className="timer-label"><Clock size={15} /> Ends In:</span>
            <div className="timer-digits">
              <div className="digit-box">
                <span className="digit-val">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="digit-unit">Hours</span>
              </div>
              <span className="digit-colon">:</span>
              <div className="digit-box">
                <span className="digit-val">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="digit-unit">Mins</span>
              </div>
              <span className="digit-colon">:</span>
              <div className="digit-box">
                <span className="digit-val">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="digit-unit">Secs</span>
              </div>
            </div>
          </div>

          <Link to="/deals" className="btn-flash-action">
            Shop All Deals <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Top Deals Product Showcase */}
      <section className="products-showcase-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">UNBEATABLE SAVINGS</span>
            <h2 className="section-title">Highest Discount Deals</h2>
          </div>
          <Link to="/deals" className="view-all-link">
            See All Deals ({products.length}) <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {topDeals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo Coupon Highlight Banner */}
      <section className="coupon-promo-banner">
        <div className="promo-sparkles"><Sparkles size={28} /></div>
        <div className="promo-text">
          <h3>Exclusive 10% Flat Discount for You</h3>
          <p>Apply code <strong>APNA10</strong> at checkout to redeem instant discount on your order!</p>
        </div>
        <div className="promo-copy-action">
          <div className="code-pill">APNA10</div>
          <button type="button" className="btn-copy-code" onClick={copyCoupon}>
            {copied ? (
              <>
                <Check size={16} /> Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Code
              </>
            )}
          </button>
        </div>
      </section>

      {/* Bestsellers Product Showcase */}
      <section className="products-showcase-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">CUSTOMER FAVORITES</span>
            <h2 className="section-title">Curated Bestsellers</h2>
          </div>
          <Link to="/products" className="view-all-link">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Verified Customer Reviews Carousel */}
      <section className="reviews-section">
        <div className="section-header center-align">
          <span className="section-eyebrow">LOVE FROM OUR PATRONS</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Over 15,000+ satisfied customers nationwide trust ApnaBazzar.</p>
        </div>

        <div className="reviews-grid">
          {customerReviews.map((rev) => (
            <div key={rev.name} className="review-card">
              <div className="review-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <h4 className="review-heading">"{rev.title}"</h4>
              <p className="review-text">{rev.comment}</p>
              <div className="review-footer">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="reviewer-name">{rev.name}</strong>
                    <span className="reviewer-city">{rev.city} · Verified Buyer</span>
                  </div>
                </div>
                <span className="reviewed-tag">{rev.productName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Values / Why ApnaBazzar */}
      <section className="why-us-section">
        <div className="why-us-grid">
          <div className="why-card">
            <div className="why-icon-circle"><ShieldCheck size={28} /></div>
            <h3>Certified Authenticity</h3>
            <p>Every cosmetic product is safe, cruelty-free and dermatologically verified. Jewellery pieces feature high-grade micro plating.</p>
          </div>
          <div className="why-card">
            <div className="why-icon-circle"><Truck size={28} /></div>
            <h3>Rapid Doorstep Delivery</h3>
            <p>Dispatched within 24 hours with premium protective bubble-wrap packaging for pristine arrival.</p>
          </div>
          <div className="why-card">
            <div className="why-icon-circle"><Banknote size={28} /></div>
            <h3>Pay However You Like</h3>
            <p>Seamless UPI, Credit & Debit Cards, Netbanking, or simply choose Cash on Delivery at your convenience.</p>
          </div>
          <div className="why-card">
            <div className="why-icon-circle"><CheckCircle size={28} /></div>
            <h3>Dedicated Support</h3>
            <p>Have questions? Our friendly customer assistance team is available Monday through Saturday to assist you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
