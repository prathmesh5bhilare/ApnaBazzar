import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  Check,
  X
} from "lucide-react";
import { useCart, FREE_DELIVERY_ABOVE } from "./CartContext";
import ProductImage from "./ProductImage";

export default function Cart() {
  const {
    cart,
    updateQty,
    removeFromCart,
    totalItems,
    totalMRP,
    totalPrice,
    savings,
    coupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    delivery,
    finalTotal,
  } = useCart();

  const [code, setCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState(null);
  const navigate = useNavigate();

  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-icon">
          <ShoppingBag size={56} />
        </div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Explore our curated cosmetics and fine jewellery collections to find your perfect match.</p>
        <Link to="/products" className="btn-primary">
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (couponCode) => {
    const toApply = couponCode || code;
    const result = applyCoupon(toApply);
    setCouponFeedback(result);
    if (result.success) setCode("");
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_ABOVE - totalPrice);
  const deliveryProgress = Math.min(100, (totalPrice / FREE_DELIVERY_ABOVE) * 100);

  const availableCoupons = [
    { code: "APNA10", label: "10% Flat OFF" },
    { code: "SAVE20", label: "20% OFF (above ₹1,499)" },
    { code: "FIRST100", label: "₹100 Flat OFF" },
    { code: "FREESHIP", label: "Free Shipping" },
  ];

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Shopping Bag ({totalItems} {totalItems === 1 ? "Item" : "Items"})</h1>
        <Link to="/products" className="continue-shopping-link">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-layout-grid">
        {/* Left Column: Items List */}
        <div className="cart-items-column">
          {/* Free Shipping Progress Indicator */}
          <div className="free-shipping-card">
            <div className="shipping-card-text">
              <Truck size={20} className="shipping-icon" />
              {remainingForFreeDelivery > 0 ? (
                <span>
                  Add items worth <b>{inr(remainingForFreeDelivery)}</b> more to unlock <b>FREE Delivery</b>!
                </span>
              ) : (
                <span className="unlocked-text">
                  🎉 Congratulations! You have unlocked <b>FREE Express Delivery</b>.
                </span>
              )}
            </div>
            <div className="shipping-progress-track">
              <div
                className="shipping-progress-fill"
                style={{ width: `${deliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-product-row">
                <Link to={`/products/${item.id}`} className="cart-img-thumb">
                  <ProductImage product={item} />
                </Link>

                <div className="cart-details-info">
                  <span className="cart-item-cat">{item.category}</span>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="cart-item-title">{item.name}</h3>
                  </Link>

                  <div className="cart-item-pricing">
                    <span className="cart-current-price">{inr(item.price)}</span>
                    <span className="cart-mrp-price">{inr(item.mrp)}</span>
                    <span className="cart-discount-tag">{item.discount}% off</span>
                  </div>

                  <div className="cart-row-actions">
                    <div className="cart-stepper">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="stepper-count">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>

                <div className="cart-line-total">
                  <span className="line-total-val">{inr(item.price * item.qty)}</span>
                  <small className="line-saving">
                    Save {inr((item.mrp - item.price) * item.qty)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary & Coupons */}
        <aside className="cart-summary-column">
          <div className="summary-card">
            <h2 className="summary-title">ORDER SUMMARY</h2>

            {/* Coupons Box */}
            <div className="coupon-section">
              <span className="coupon-section-title">
                <Tag size={15} /> Apply Coupon
              </span>

              {coupon ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-info">
                    <Check size={16} className="coupon-check" />
                    <span><b>{coupon}</b> applied</span>
                  </div>
                  <button
                    type="button"
                    className="btn-remove-coupon"
                    onClick={removeCoupon}
                    title="Remove coupon"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-apply-coupon"
                    onClick={() => handleApplyCoupon()}
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponFeedback && (
                <p className={`coupon-feedback-msg ${couponFeedback.success ? "success" : "error"}`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Quick Coupon Chips */}
              {!coupon && (
                <div className="quick-coupons-list">
                  <span className="quick-coupon-heading">Available Offers:</span>
                  <div className="quick-coupon-chips">
                    {availableCoupons.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        className="quick-coupon-btn"
                        onClick={() => handleApplyCoupon(c.code)}
                      >
                        <b>{c.code}</b> ({c.label})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Breakdown Rows */}
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Total MRP ({totalItems} items)</span>
                <span>{inr(totalMRP)}</span>
              </div>
              <div className="summary-row green-row">
                <span>Discount on MRP</span>
                <span>− {inr(savings)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="summary-row green-row">
                  <span>Coupon Discount ({coupon})</span>
                  <span>− {inr(couponDiscount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping & Delivery</span>
                <span>
                  {delivery === 0 ? (
                    <strong className="green-text">FREE</strong>
                  ) : (
                    inr(delivery)
                  )}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-highlight-row">
                <span>Total Amount</span>
                <span className="total-highlight-val">{inr(finalTotal)}</span>
              </div>

              <div className="summary-savings-banner">
                🎉 You will save <b>{inr(savings + couponDiscount)}</b> on this purchase!
              </div>
            </div>

            <button
              type="button"
              className="btn-checkout-primary"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <ArrowRight size={17} />
            </button>

            {/* Security Seals */}
            <div className="cart-trust-badges">
              <div className="trust-seal-item">
                <ShieldCheck size={16} /> 256-Bit Bank Grade SSL
              </div>
              <div className="trust-seal-item">
                <Truck size={16} /> Safe & Insured Shipping
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
