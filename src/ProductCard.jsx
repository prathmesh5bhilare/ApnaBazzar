import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { useCart, FREE_DELIVERY_ABOVE } from "./CartContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQty } = useCart();
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(false);

  const inCart = cart.find((i) => i.id === product.id);
  const reviews = ((product.id * 137) % 900) + 100;
  const inr = (n) => "₹" + n.toLocaleString("en-IN");
  const link = `/products/${product.id}`;

  const handleAdd = () => {
    addToCart(product);
    setPop(true);
    setTimeout(() => setPop(false), 700);
  };

  return (
    <div className={pop ? "card pop" : "card"}>
      <div className="card-img">
        <Link to={link}>
          <ProductImage product={product} />
        </Link>
        <span className="off-badge">{product.discount}% off</span>
        <button
          className={liked ? "heart liked" : "heart"}
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>
        <Link to={link} className="quick-view">View details</Link>
      </div>

      <div className="card-body">
        <p className="cat-label">{product.category}</p>
        <Link to={link}>
          <h3>{product.name}</h3>
        </Link>

        <div className="rate-row">
          <span className="rating">
            <Star size={12} fill="currentColor" /> {product.rating}
          </span>
          <span className="muted small">{reviews} reviews</span>
        </div>

        <div className="price-row">
          <span className="price">{inr(product.price)}</span>
          <span className="mrp">{inr(product.mrp)}</span>
        </div>
        <p className="save-line">You save {inr(product.mrp - product.price)}</p>

        {product.price >= FREE_DELIVERY_ABOVE && (
          <p className="free-tag"><Truck size={14} /> Free delivery</p>
        )}
      </div>

      <div className="card-foot">
        {inCart ? (
          <div className="stepper">
            <button onClick={() => updateQty(product.id, inCart.qty - 1)} aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <span>{inCart.qty} in cart</span>
            <button onClick={() => updateQty(product.id, inCart.qty + 1)} aria-label="Increase quantity">
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
