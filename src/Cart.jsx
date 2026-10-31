import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, FREE_DELIVERY_ABOVE } from "./CartContext";
import ProductImage from "./ProductImage";

export default function Cart() {
  const {
    cart, updateQty, removeFromCart, totalItems, totalMRP, totalPrice, savings,
    coupon, applyCoupon, removeCoupon, couponDiscount, delivery, finalTotal,
  } = useCart();

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  if (cart.length === 0)
    return (
      <div className="empty">
        <h2>Your cart is empty</h2>
        <p>Add something you love!</p>
        <Link to="/products" className="btn">Continue Shopping</Link>
      </div>
    );

  const handleApply = () => {
    setMsg(applyCoupon(code) ? "" : "Invalid coupon code");
    setCode("");
  };

  const remaining = FREE_DELIVERY_ABOVE - totalPrice;
  const progress = Math.min(100, (totalPrice / FREE_DELIVERY_ABOVE) * 100);
  const inr = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <>
      <h2>My Cart ({totalItems} items)</h2>

      <div className="cart-layout">
        <div className="cart-list">
          <div className="progress-box">
            {remaining > 0
              ? <p>Add <b>{inr(remaining)}</b> more for <b>FREE delivery</b></p>
              : <p>You get <b>FREE delivery</b> on this order!</p>}
            <div className="bar"><div style={{ width: progress + "%" }} /></div>
          </div>

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/products/${item.id}`} className="cart-thumb">
                <ProductImage product={item} />
              </Link>

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="cat-label">{item.category}</p>
                <div className="price-row">
                  <span className="price">{inr(item.price)}</span>
                  <span className="mrp">{inr(item.mrp)}</span>
                  <span className="off">{item.discount}% off</span>
                </div>
                <div className="cart-actions">
                  <div className="qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button className="link-btn" onClick={() => removeFromCart(item.id)}>REMOVE</button>
                </div>
              </div>

              <div className="line-total">{inr(item.price * item.qty)}</div>
            </div>
          ))}
        </div>

        <aside className="price-box">
          <h3>PRICE DETAILS</h3>

          <div className="coupon">
            {coupon ? (
              <p className="ok">
                <b>{coupon}</b> applied{" "}
                <button className="link-btn" onClick={removeCoupon}>Remove</button>
              </p>
            ) : (
              <>
                <input
                  placeholder="Coupon code (try APNA10)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleApply}>Apply</button>
              </>
            )}
          </div>
          {msg && <p className="error">{msg}</p>}

          <div className="row"><span>Price ({totalItems} items)</span><span>{inr(totalMRP)}</span></div>
          <div className="row green"><span>Discount</span><span>− {inr(savings)}</span></div>
          {couponDiscount > 0 && (
            <div className="row green"><span>Coupon ({coupon})</span><span>− {inr(couponDiscount)}</span></div>
          )}
          <div className="row">
            <span>Delivery</span>
            <span>{delivery === 0 ? <b className="green-text">FREE</b> : inr(delivery)}</span>
          </div>
          <div className="row total-row"><span>Total Amount</span><span>{inr(finalTotal)}</span></div>
          <p className="save-note">You will save {inr(savings + couponDiscount)} on this order</p>

          <Link to="/checkout" className="btn btn-accent full">Place Order</Link>
        </aside>
      </div>
    </>
  );
}
