import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "CURATED COLLECTION",
    badge: "Special Launch Offer",
    title: "Timeless Elegance & Radiant Beauty",
    subtitle: "Discover handcrafted Kundan jewellery and dermatologist-approved cosmetics designed for every festive moment.",
    cta: "Explore Collection",
    to: "/products",
    img: "/images/banner-jewellery.jpg",
    accent: "#d4af37",
    theme: "slide-gold",
  },
  {
    id: 2,
    tag: "COSMETICS ESSENTIALS",
    badge: "Up to 45% OFF",
    title: "Flawless Glamour, Every Single Day",
    subtitle: "From velvety matte lipsticks to HD liquid foundations and rich eyeshadow palettes starting from ₹199.",
    cta: "Shop Cosmetics",
    to: "/products?cat=Cosmetics",
    img: "/images/banner-cosmetics.jpg",
    accent: "#ec4899",
    theme: "slide-rose",
  },
  {
    id: 3,
    tag: "EXCLUSIVE JEWELLERY",
    badge: "Handcrafted 18K Polish",
    title: "Royalty in Every Detail",
    subtitle: "Sparkling American Diamond studs, Temple Chokers, and festive Jhumkas crafted to perfection.",
    cta: "Shop Jewellery",
    to: "/products?cat=Jewellery",
    img: "/images/cat-jewellery.jpg",
    accent: "#eab308",
    theme: "slide-emerald",
  },
  {
    id: 4,
    tag: "WELCOME PROMO",
    badge: "Extra 10% OFF",
    title: "Save Big with Code APNA10",
    subtitle: "Enjoy free express doorstep delivery across India on all orders above ₹999 plus 7-day hassle-free returns.",
    cta: "View Top Deals",
    to: "/deals",
    img: "/images/cat-cosmetics.jpg",
    accent: "#10b981",
    theme: "slide-dark",
  },
];

export default function OfferSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goTo = (index) => setCurrent((index + slides.length) % slides.length);

  return (
    <section
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotional Offers"
    >
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-slide ${s.theme}`}
            aria-hidden={current !== idx}
          >
            <div className="hero-content">
              <div className="hero-tags">
                <span className="hero-tag-pill">
                  <Sparkles size={13} /> {s.tag}
                </span>
                <span className="hero-badge-pill">{s.badge}</span>
              </div>

              <h1 className="hero-title">{s.title}</h1>
              <p className="hero-desc">{s.subtitle}</p>

              <div className="hero-cta-group">
                <Link to={s.to} className="btn-hero-primary">
                  {s.cta} <ArrowRight size={17} />
                </Link>
                <Link to="/products" className="btn-hero-secondary">
                  Browse Catalog
                </Link>
              </div>

              <div className="hero-perks-row">
                <span>✓ 100% Genuine</span>
                <span>✓ BIS Hallmarked</span>
                <span>✓ Free COD Above ₹999</span>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-img-backdrop"></div>
              <img
                src={s.img}
                alt={s.title}
                className="hero-banner-img"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="hero-arrow left-arrow"
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        className="hero-arrow right-arrow"
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Bottom Dots Indicator */}
      <div className="hero-dots">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`hero-dot ${idx === current ? "active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
