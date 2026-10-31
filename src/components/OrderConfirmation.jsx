import { useLocation, Navigate, Link } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Package,
  Truck,
  Home as HomeIcon,
  Check,
  CheckCircle2,
  Printer,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import ProductImage from "./ProductImage";

export default function OrderConfirmation() {
  const { state } = useLocation();
  if (!state?.order) return <Navigate to="/" replace />;

  const { order } = state;
  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalCount = order.items.reduce((s, i) => s + i.qty, 0);

  const eta = new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const steps = [
    { label: "Order Confirmed", icon: Check, status: "completed" },
    { label: "Processing & Quality Check", icon: Package, status: "active" },
    { label: "Dispatched via Express", icon: Truck, status: "pending" },
    { label: "Delivered to Doorstep", icon: HomeIcon, status: "pending" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-confirmation-page">
      {/* Celebration Hero Card */}
      <div className="confirmation-hero-card">
        <div className="celebration-circle">
          <CheckCircle2 size={58} className="celebration-check-icon" />
        </div>
        <span className="confirmation-pill">
          <Sparkles size={14} /> ORDER CONFIRMED
        </span>
        <h1 className="confirmation-title">Thank You for Your Order!</h1>
        <p className="confirmation-sub">
          We've received your order and our team has started preparing your parcel. A confirmation email has been dispatched to <b>{order.shipping.email}</b>.
        </p>

        <div className="order-id-eta-strip">
          <div className="meta-box">
            <span className="meta-label">ORDER ID</span>
            <strong className="meta-val">{order.orderId}</strong>
          </div>
          <div className="meta-divider"></div>
          <div className="meta-box">
            <span className="meta-label">ESTIMATED DELIVERY</span>
            <strong className="meta-val green-text">{eta}</strong>
          </div>
          <div className="meta-divider"></div>
          <div className="meta-box">
            <span className="meta-label">PAYMENT MODE</span>
            <strong className="meta-val">{order.payment}</strong>
          </div>
        </div>
      </div>

      {/* Shipment Tracker Bar */}
      <div className="order-tracker-card">
        <h3 className="tracker-heading">Delivery Status</h3>
        <div className="tracker-timeline">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={st.label} className={`tracker-step ${st.status}`}>
                <div className="tracker-node">
                  <Icon size={18} />
                </div>
                <span className="tracker-label">{st.label}</span>
                {st.status === "completed" && <span className="step-timestamp">Today</span>}
                {st.status === "active" && <span className="step-timestamp">In Progress</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details & Summary Grid */}
      <div className="order-details-grid">
        {/* Left Column: Ordered Items */}
        <div className="order-items-card">
          <div className="card-header-row">
            <h3>Items in this Shipment ({totalCount})</h3>
            <button type="button" className="btn-print-receipt" onClick={handlePrint}>
              <Printer size={15} /> Print Invoice
            </button>
          </div>

          <div className="order-items-table">
            {order.items.map((item) => (
              <div key={item.id} className="order-item-row">
                <div className="order-item-thumb">
                  <ProductImage product={item} />
                </div>
                <div className="order-item-info">
                  <span className="order-item-cat">{item.category}</span>
                  <h4 className="order-item-title">{item.name}</h4>
                  <span className="order-item-qty">
                    Qty: {item.qty} × {inr(item.price)}
                  </span>
                </div>
                <div className="order-item-price">
                  {inr(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Address and Payment Info */}
        <div className="order-sidebar-cards">
          <div className="order-info-card">
            <div className="info-card-header">
              <MapPin size={18} /> <h3>Shipping Address</h3>
            </div>
            <div className="info-card-content">
              <strong>{order.shipping.name}</strong>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state || "India"} - {order.shipping.pincode}</p>
              <p className="phone-line">📱 Mobile: {order.shipping.phone}</p>
            </div>
          </div>

          <div className="order-info-card">
            <div className="info-card-header">
              <CreditCard size={18} /> <h3>Payment Summary</h3>
            </div>
            <div className="info-card-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Payment Mode</span>
                <span>{order.payment}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="green-text">FREE</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total Paid</span>
                <span className="total-val">{inr(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="confirmation-actions-footer">
        <Link to="/products" className="btn-primary">
          <ShoppingBag size={17} /> Continue Shopping
        </Link>
        <Link to="/" className="btn-secondary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
