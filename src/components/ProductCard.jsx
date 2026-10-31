import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Eye } from "lucide-react";
import { useCart, FREE_DELIVERY_ABOVE } from "./CartContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, onQuickView }) {
  const { cart, addToCart, updateQty, isInWishlist, toggleWishlist } = useCart();
  const [pop, setPop] = useState(false);

  const inCart = cart.find((i) => i.id === product.id);
  const liked = isInWishlist(product.id);
  const reviews = ((product.id * 137) % 850) + 120;
  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
  const link = `/products/${product.id}`;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };

  return (
    <div className={`card ${pop ? "pop" : ""}`}>
      <div className="card-img-wrap">
        <Link to={link} className="card-img-link" tabIndex={-1}>
          <ProductImage product={product} />
        </Link>

        {product.discount > 0 && (
          <span className="badge-discount">
            {product.discount}% OFF
          </span>
        )}

        {product.featured && (
          <span className="badge-featured">
            BESTSELLER
          </span>
        )}

        <button
          type="button"
          className={`wishlist-btn ${liked ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          title={liked ? "Saved to Wishlist" : "Save to Wishlist"}
        >
          <Heart size={18} fill={liked ? "#e11d48" : "none"} color={liked ? "#e11d48" : "#4b5563"} />
        </button>

        <div className="card-quick-actions">
          <Link to={link} className="btn-quick-view">
            <Eye size={15} /> Quick Details
          </Link>
        </div>
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="card-cat">{product.category}</span>
          <div className="card-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="rate-num">{product.rating}</span>
            <span className="rate-count">({reviews})</span>
          </div>
        </div>

        <Link to={link} className="card-title-link">
          <h3 className="card-title" title={product.name}>{product.name}</h3>
        </Link>

        <p className="card-desc-snippet">{product.description}</p>

        <div className="card-pricing">
          <div className="price-row">
            <span className="current-price">{inr(product.price)}</span>
            <span className="mrp-price">{inr(product.mrp)}</span>
          </div>
          <span className="save-badge">Save {inr(product.mrp - product.price)}</span>
        </div>

        {product.price >= FREE_DELIVERY_ABOVE && (
          <div className="free-shipping-tag">
            <Truck size={13} /> Free Express Delivery
          </div>
        )}
      </div>

      <div className="card-footer">
        {inCart ? (
          <div className="stepper-cart">
            <button
              type="button"
              onClick={() => updateQty(product.id, inCart.qty - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>
            <span className="stepper-val">{inCart.qty} in cart</span>
            <button
              type="button"
              onClick={() => updateQty(product.id, inCart.qty + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>
        ) : (
          <button type="button" className="btn-add-cart" onClick={handleAdd}>
            <ShoppingBag size={16} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
