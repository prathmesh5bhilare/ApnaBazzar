import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  Lock,
  CheckCircle2,
  MapPin
} from "lucide-react";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";

export default function Checkout() {
  const { cart, finalTotal: totalPrice, clearCart, savings, delivery, couponDiscount } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    payment: "UPI",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) return <Navigate to="/cart" replace />;

  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name (at least 3 characters)";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (form.address.trim().length < 8) e.address = "Address must be at least 8 characters";
    if (!form.city.trim()) e.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be exactly 6 digits";

    if (form.payment === "UPI") {
      if (form.upiId && !form.upiId.includes("@")) {
        e.upiId = "Enter a valid UPI ID (e.g. name@okhdfcbank)";
      }
    } else if (form.payment === "CARD") {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
        e.cardNumber = "Card number must be 16 digits";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
        e.expiry = "Expiry must be in MM/YY format";
      }
      if (!/^\d{3}$/.test(form.cvv)) {
        e.cvv = "CVV must be 3 digits";
      }
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    setTimeout(() => {
      const order = {
        orderId: "AB-" + Math.floor(100000 + Math.random() * 900000),
        items: cart,
        total: totalPrice,
        payment:
          form.payment === "COD"
            ? "Cash on Delivery (COD)"
            : form.payment === "UPI"
            ? `UPI (${form.upiId || "Instant QR Pay"})`
            : "Credit / Debit Card",
        shipping: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
      };

      clearCart();
      navigate("/order-confirmation", { state: { order } });
    }, 800);
  };

  return (
    <div className="checkout-page-container">
      {/* Checkout Steps Indicator */}
      <div className="checkout-progress-steps">
        <div className="step-point completed">
          <span className="step-circle"><CheckCircle2 size={16} /></span>
          <span className="step-text">Cart</span>
        </div>
        <div className="step-connector completed"></div>
        <div className="step-point active">
          <span className="step-circle">2</span>
          <span className="step-text">Shipping & Payment</span>
        </div>
        <div className="step-connector"></div>
        <div className="step-point">
          <span className="step-circle">3</span>
          <span className="step-text">Confirmation</span>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Checkout Form */}
        <div className="checkout-form-column">
          <form onSubmit={handleSubmit} noValidate className="checkout-main-form">
            {/* Shipping Address Section */}
            <div className="form-section-card">
              <div className="form-section-header">
                <MapPin size={20} className="section-header-icon" />
                <div>
                  <h3>Delivery Address</h3>
                  <p>Where should we deliver your luxury parcel?</p>
                </div>
              </div>

              <div className="form-fields-grid">
                <div className="field-group span-2">
                  <label>Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && <span className="field-error-msg">{errors.name}</span>}
                </div>

                <div className="field-group">
                  <label>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </div>

                <div className="field-group">
                  <label>Phone Number (10 Digits) *</label>
                  <input
                    name="phone"
                    type="tel"
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                </div>

                <div className="field-group span-2">
                  <label>Street Address / House No. / Landmark *</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="e.g. Flat 402, Lotus Residency, MG Road"
                    value={form.address}
                    onChange={handleChange}
                    className={errors.address ? "has-error" : ""}
                  />
                  {errors.address && <span className="field-error-msg">{errors.address}</span>}
                </div>

                <div className="field-group">
                  <label>City *</label>
                  <input
                    name="city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={form.city}
                    onChange={handleChange}
                    className={errors.city ? "has-error" : ""}
                  />
                  {errors.city && <span className="field-error-msg">{errors.city}</span>}
                </div>

                <div className="field-group">
                  <label>PIN Code *</label>
                  <input
                    name="pincode"
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 400001"
                    value={form.pincode}
                    onChange={handleChange}
                    className={errors.pincode ? "has-error" : ""}
                  />
                  {errors.pincode && <span className="field-error-msg">{errors.pincode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="form-section-card">
              <div className="form-section-header">
                <CreditCard size={20} className="section-header-icon" />
                <div>
                  <h3>Select Payment Method</h3>
                  <p>All transactions are 100% encrypted & secure</p>
                </div>
              </div>

              <div className="payment-options-list">
                {/* UPI Option */}
                <label className={`payment-option-card ${form.payment === "UPI" ? "selected" : ""}`}>
                  <div className="payment-radio-row">
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={form.payment === "UPI"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-info">
                      <div className="payment-title-row">
                        <QrCode size={18} />
                        <strong>UPI / QR Instant Payment (GooglePay, PhonePe, Paytm)</strong>
                      </div>
                      <p className="payment-desc">Zero transaction fee. Fastest checkout option.</p>
                    </div>
                  </div>

                  {form.payment === "UPI" && (
                    <div className="payment-sub-fields">
                      <input
                        type="text"
                        name="upiId"
                        placeholder="Enter UPI ID (optional, or scan QR at next step)"
                        value={form.upiId}
                        onChange={handleChange}
                      />
                      {errors.upiId && <span className="field-error-msg">{errors.upiId}</span>}
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label className={`payment-option-card ${form.payment === "CARD" ? "selected" : ""}`}>
                  <div className="payment-radio-row">
                    <input
                      type="radio"
                      name="payment"
                      value="CARD"
                      checked={form.payment === "CARD"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-info">
                      <div className="payment-title-row">
                        <CreditCard size={18} />
                        <strong>Credit / Debit Card (Visa, Mastercard, RuPay)</strong>
                      </div>
                      <p className="payment-desc">256-bit bank encrypted card processing.</p>
                    </div>
                  </div>

                  {form.payment === "CARD" && (
                    <div className="payment-sub-fields card-fields">
                      <div className="field-group span-2">
                        <input
                          type="text"
                          name="cardNumber"
                          maxLength={16}
                          placeholder="16-digit Card Number"
                          value={form.cardNumber}
                          onChange={handleChange}
                        />
                        {errors.cardNumber && <span className="field-error-msg">{errors.cardNumber}</span>}
                      </div>
                      <div className="field-group">
                        <input
                          type="text"
                          name="expiry"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={handleChange}
                        />
                        {errors.expiry && <span className="field-error-msg">{errors.expiry}</span>}
                      </div>
                      <div className="field-group">
                        <input
                          type="password"
                          name="cvv"
                          maxLength={3}
                          placeholder="CVV"
                          value={form.cvv}
                          onChange={handleChange}
                        />
                        {errors.cvv && <span className="field-error-msg">{errors.cvv}</span>}
                      </div>
                    </div>
                  )}
                </label>

                {/* COD Option */}
                <label className={`payment-option-card ${form.payment === "COD" ? "selected" : ""}`}>
                  <div className="payment-radio-row">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={form.payment === "COD"}
                      onChange={handleChange}
                    />
                    <div className="payment-option-info">
                      <div className="payment-title-row">
                        <Banknote size={18} />
                        <strong>Cash on Delivery (COD)</strong>
                      </div>
                      <p className="payment-desc">Pay cash or UPI to the courier agent when order arrives.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-place-order-large" disabled={submitting}>
              {submitting ? (
                "Processing Secure Order..."
              ) : (
                <>
                  <Lock size={16} /> Place Order & Pay {inr(totalPrice)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Preview */}
        <aside className="checkout-summary-column">
          <div className="summary-card">
            <h3 className="summary-title">ORDER SUMMARY ({cart.length} ITEMS)</h3>

            <div className="checkout-mini-items">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-preview">
                  <div className="mini-thumb">
                    <ProductImage product={item} />
                  </div>
                  <div className="mini-info">
                    <h4>{item.name}</h4>
                    <span className="mini-qty">Qty {item.qty} × {inr(item.price)}</span>
                  </div>
                  <span className="mini-line-price">{inr(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{inr(cart.reduce((s, i) => s + i.price * i.qty, 0))}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="summary-row green-row">
                  <span>Coupon Savings</span>
                  <span>− {inr(couponDiscount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Delivery</span>
                <span>{delivery === 0 ? <b className="green-text">FREE</b> : inr(delivery)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-highlight-row">
                <span>Total Payable</span>
                <span className="total-highlight-val">{inr(totalPrice)}</span>
              </div>
            </div>

            <div className="checkout-guarantees">
              <div className="guarantee-line">
                <ShieldCheck size={16} className="text-emerald" /> 100% Purchase Protection
              </div>
              <div className="guarantee-line">
                <Truck size={16} className="text-emerald" /> Dispatched within 24 Hours
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
