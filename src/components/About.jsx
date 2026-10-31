import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Truck, Award, Users, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="about-page-container">
      {/* Brand Hero */}
      <div className="about-hero-section">
        <span className="about-badge">OUR ESSENCE & STORY</span>
        <h1>Welcome to ApnaBazzar</h1>
        <p className="about-lead">
          Crafting moments of splendour through certified, luxury beauty products and intricately designed handcrafted jewellery.
        </p>
      </div>

      {/* Story Grid */}
      <div className="about-story-grid">
        <div className="story-card">
          <div className="story-icon"><Sparkles size={32} /></div>
          <h3>Curated with Passion</h3>
          <p>
            ApnaBazzar was conceived with a simple vision: to bring authentic, high-grade beauty essentials and festive jewellery within reach of every celebration across India, without compromising on craftsmanship or purity.
          </p>
        </div>

        <div className="story-card">
          <div className="story-icon"><ShieldCheck size={32} /></div>
          <h3>Rigorous Authenticity</h3>
          <p>
            Every single cosmetic formulation is dermatologist verified and cruelty-free. Our traditional and modern jewellery pieces feature premium alloys and multi-layer polish designed to retain brilliance over years.
          </p>
        </div>

        <div className="story-card">
          <div className="story-icon"><Heart size={32} /></div>
          <h3>Customer-First Philosophy</h3>
          <p>
            With over 15,000+ satisfied patrons nationwide, we pride ourselves on exceptional customer care, smooth doorstep Cash on Delivery, and our no-questions-asked 7-day return guarantee.
          </p>
        </div>
      </div>

      {/* Stats Counter Banner */}
      <div className="about-stats-banner">
        <div className="stat-item">
          <span className="stat-number">15,000+</span>
          <span className="stat-title">Delighted Customers</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-title">Authentic Products</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">48 Hrs</span>
          <span className="stat-title">Average Dispatch Time</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">4.6 ★</span>
          <span className="stat-title">Store Satisfaction</span>
        </div>
      </div>

      {/* Contact & Support Section */}
      <div className="about-contact-card">
        <h3>We’re Here for You</h3>
        <p>
          Whether you need assistance picking the right shade of lipstick, choosing bridal jewellery, or tracking your order, our dedicated team is at your service.
        </p>
        <div className="contact-details-row">
          <div>📧 Email: <b>support@apnabazzar.com</b></div>
          <div>📞 WhatsApp Support: <b>+91 98765 43210</b></div>
          <div>🕒 Hours: <b>Mon – Sat: 9:00 AM – 8:00 PM IST</b></div>
        </div>
        <Link to="/products" className="btn-primary">
          Explore Our Collection <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
