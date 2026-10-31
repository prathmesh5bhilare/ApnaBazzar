import { Link } from "react-router-dom";
import { Truck, Banknote, Undo2, ShieldCheck, BadgeCheck } from "lucide-react";
import { products } from "./products";
import ProductCard from "./ProductCard";
import OfferSlider from "./OfferSlider";

const cats = [
  ["Skincare", "/images/cat-skincare.jpg"],
  ["Cosmetics", "/images/cat-cosmetics.jpg"],
  ["Ladies Jewellery", "/images/cat-ladies-jewellery.jpg"],
];

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <>
      <OfferSlider />

      <div className="ribbon">
        <div><Undo2 size={26} /> Easy Returns</div>
        <div><BadgeCheck size={26} /> 100% Authentic</div>
        <div><Banknote size={26} /> Cash on Delivery</div>
      </div>

      <div className="cats">
        {cats.map(([name, img]) => (
          <Link key={name} to={`/products?cat=${name}`} className="cat-tile">
            <span className="cat-photo"><img src={img} alt={name} onError={(e) => (e.currentTarget.style.display = "none")} /></span>
            {name}
          </Link>
        ))}
      </div>

      <div className="section-head">
        <h2>Top Deals</h2>
        <Link to="/deals">See all →</Link>
      </div>
      <div className="grid">
        {topDeals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="section-head">
        <h2>Bestsellers</h2>
        <Link to="/products">View all →</Link>
      </div>
      <div className="grid">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="trust">
        <div><Truck size={22} /><b>Free Delivery</b>on orders above ₹999</div>
        <div><Banknote size={22} /><b>Cash on Delivery</b>pay when it arrives</div>
        <div><Undo2 size={22} /><b>Easy Returns</b>7 day return policy</div>
        <div><ShieldCheck size={22} /><b>Secure Checkout</b>your details are safe</div>
      </div>
    </>
  );
}
