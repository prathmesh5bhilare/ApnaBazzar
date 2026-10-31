import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "./products";
import { useCart } from "./CartContext";
import ProductImage from "./ProductImage";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p className="empty">Loading product...</p>;

  if (error)
    return (
      <div className="empty">
        <p className="error">{error}</p>
        <Link to="/products" className="btn">← Back to products</Link>
      </div>
    );

  return (
    <div className="details">
      <ProductImage product={product} />
      <div>
        <p className="cat-label">{product.category}</p>
        <h2>{product.name}</h2>
        <span className="rating">{product.rating} / 5</span>
        <div className="price-row big">
          <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
          <span className="off">{product.discount}% off</span>
        </div>
        <p className="desc">{product.description}</p>
        <ul className="perks">
          <li>Free delivery above ₹999</li>
          <li>Cash on Delivery available</li>
          <li>7 day easy return</li>
        </ul>
        <button className="btn-light-dark" onClick={() => addToCart(product)}>Add to Cart</button>{" "}
        <button
          className="btn-accent"
          onClick={() => { addToCart(product); navigate("/cart"); }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
