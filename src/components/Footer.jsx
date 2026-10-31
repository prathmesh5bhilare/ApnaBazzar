import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Heart,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Newsletter Strip */}
      <div className="footer-newsletter-strip">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <span className="newsletter-tag">
              <Sparkles size={14} /> JOIN THE APNA PRIVILEGE CLUB
            </span>
            <h3>Get ₹200 OFF on your first purchase!</h3>
            <p>Subscribe for exclusive festive drops, secret flash sales, and beauty tips.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscribed-msg">
                <CheckCircle2 size={18} /> Thank you for subscribing! Check your inbox for your code.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="logo-sparkle"><Sparkles size={18} /></div>
              <span>Apna<span>Bazzar</span></span>
            </Link>
            <p className="footer-brand-desc">
              India's preferred destination for authentic, dermatologist-tested cosmetics and handcrafted luxury festive jewellery. Bringing elegance to every celebration.
            </p>
            <div className="footer-contact-info">
              <div className="contact-line">
                <Mail size={15} /> support@apnabazzar.com
              </div>
              <div className="contact-line">
                <Phone size={15} /> +91 98765 43210 (Mon-Sat, 9am - 8pm)
              </div>
              <div className="contact-line">
                <MapPin size={15} /> Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Categories Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/products?cat=Cosmetics">Cosmetics & Makeup</Link></li>
              <li><Link to="/products?cat=Jewellery">Bridal & Fine Jewellery</Link></li>
              <li><Link to="/products?q=Lipstick">Matte & Gloss Lipsticks</Link></li>
              <li><Link to="/products?q=Choker">Kundan & Choker Sets</Link></li>
              <li><Link to="/products?q=Jhumka">Traditional Jhumkas</Link></li>
              <li><Link to="/deals">Mega Festive Deals</Link></li>
            </ul>
          </div>

          {/* Quick Help & Policies */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/cart">Track My Order</Link></li>
              <li><Link to="/about">About ApnaBazzar</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">Shopping Bag</Link></li>
              <li><Link to="/about">7-Day Easy Returns</Link></li>
              <li><Link to="/about">Authenticity Guarantee</Link></li>
            </ul>
          </div>

          {/* Payment Badges & Trust */}
          <div className="footer-col trust-col">
            <h4 className="footer-heading">Trust & Security</h4>
            <p className="trust-desc">
              We ensure 100% secure payment processing with 256-bit SSL encryption.
            </p>

            <div className="payment-badges-wrap">
              <span className="pay-badge">UPI</span>
              <span className="pay-badge">Google Pay</span>
              <span className="pay-badge">PhonePe</span>
              <span className="pay-badge">Paytm</span>
              <span className="pay-badge">Visa</span>
              <span className="pay-badge">Mastercard</span>
              <span className="pay-badge">RuPay</span>
              <span className="pay-badge">Cash on Delivery</span>
            </div>

            <div className="guarantee-box">
              <ShieldCheck size={20} className="text-gold" />
              <span>100% Authentic Products Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} ApnaBazzar India Pvt. Ltd. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about">Terms of Service</Link>
            <span>•</span>
            <Link to="/about">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
