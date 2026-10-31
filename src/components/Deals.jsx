import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Percent, ArrowRight } from "lucide-react";
import { products } from "./products";
import ProductCard from "./ProductCard";

export default function Deals() {
  const [filter, setFilter] = useState("all");

  const deals = products
    .filter((p) => p.discount >= 25)
    .sort((a, b) => b.discount - a.discount);

  const filteredDeals = deals.filter((p) => {
    if (filter === "40plus") return p.discount >= 40;
    if (filter === "under700") return p.price <= 700;
    if (filter === "cosmetics") return p.category === "Cosmetics";
    if (filter === "jewellery") return p.category === "Jewellery";
    return true;
  });

  return (
    <div className="deals-page-container">
      {/* Luxury Mega Deals Banner */}
      <div className="deals-hero-banner">
        <div className="deals-banner-content">
          <div className="deals-badge-pill">
            <Flame size={16} /> LIMITED PERIOD OFFERS
          </div>
          <h1>Festive Mega Deals & Discounts</h1>
          <p>
            Handpicked premium cosmetics and fine jewellery with up to 50% discount. Authentic quality guaranteed with easy Cash on Delivery.
          </p>
          <div className="deals-meta-pills">
            <span>✓ Up to 50% Off</span>
            <span>✓ Free Delivery Above ₹999</span>
            <span>✓ Code APNA10 for Extra 10% Off</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="deals-filter-bar">
        <button
          type="button"
          className={`deal-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Deals ({deals.length})
        </button>
        <button
          type="button"
          className={`deal-filter-btn ${filter === "40plus" ? "active" : ""}`}
          onClick={() => setFilter("40plus")}
        >
          🔥 40%+ Off Mega Savings
        </button>
        <button
          type="button"
          className={`deal-filter-btn ${filter === "under700" ? "active" : ""}`}
          onClick={() => setFilter("under700")}
        >
          Under ₹700 Budget Steals
        </button>
        <button
          type="button"
          className={`deal-filter-btn ${filter === "cosmetics" ? "active" : ""}`}
          onClick={() => setFilter("cosmetics")}
        >
          Cosmetics Offers
        </button>
        <button
          type="button"
          className={`deal-filter-btn ${filter === "jewellery" ? "active" : ""}`}
          onClick={() => setFilter("jewellery")}
        >
          Jewellery Offers
        </button>
      </div>

      {/* Deals Products Grid */}
      <div className="products-grid">
        {filteredDeals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
