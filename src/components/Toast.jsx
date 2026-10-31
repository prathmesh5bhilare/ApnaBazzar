import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Heart, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";

export default function Toast() {
  const { toast, totalItems } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast || !visible) return null;

  const isWishlist = toast.type === "info" || toast.message?.includes("wishlist");

  return (
    <aside className="toast-notification-wrap" role="status" aria-live="polite">
      <div className={`toast-card ${isWishlist ? "wishlist-toast" : "cart-toast"}`}>
        <div className="toast-img-box">
          <ProductImage product={toast.product} />
        </div>

        <div className="toast-content-box">
          <div className="toast-status-line">
            {isWishlist ? (
              <Heart size={14} className="toast-heart-icon" fill="currentColor" />
            ) : (
              <CheckCircle2 size={14} className="toast-check-icon" />
            )}
            <span>{toast.message || "Added to cart"}</span>
          </div>
          <strong className="toast-item-name">{toast.product.name}</strong>
          <small className="toast-meta">
            {isWishlist ? "Saved in your Wishlist" : `${totalItems} item(s) in bag`}
          </small>
        </div>

        <div className="toast-actions">
          {!isWishlist && (
            <Link
              to="/cart"
              className="toast-action-btn"
              onClick={() => setVisible(false)}
            >
              View Bag
            </Link>
          )}
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => setVisible(false)}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
