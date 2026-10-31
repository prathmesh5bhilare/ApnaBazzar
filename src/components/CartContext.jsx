import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const FREE_DELIVERY_ABOVE = 999;
export const DELIVERY_FEE = 49;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("apna-cart-v2")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("apna-wishlist-v2")) || [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("apna-cart-v2", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("apna-wishlist-v2", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast({ id: Date.now(), product, message: "Added to cart" });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon("");
  };

  // Wishlist functionality
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        setToast({ id: Date.now(), product, message: "Removed from wishlist", type: "info" });
        return prev.filter((p) => p.id !== product.id);
      } else {
        setToast({ id: Date.now(), product, message: "Added to wishlist", type: "success" });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  // Coupons
  const applyCoupon = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    if (code === "APNA10") {
      setCoupon("APNA10");
      return { success: true, message: "10% discount applied!" };
    }
    if (code === "SAVE20") {
      if (totalPrice < 1499) {
        return { success: false, message: "Minimum order value ₹1,499 required for SAVE20" };
      }
      setCoupon("SAVE20");
      return { success: true, message: "20% discount applied!" };
    }
    if (code === "FIRST100") {
      setCoupon("FIRST100");
      return { success: true, message: "₹100 discount applied!" };
    }
    if (code === "FREESHIP") {
      setCoupon("FREESHIP");
      return { success: true, message: "Free shipping unlocked!" };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => setCoupon("");

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalMRP = cart.reduce((s, i) => s + i.mrp * i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = Math.max(0, totalMRP - totalPrice);

  let couponDiscount = 0;
  if (coupon === "APNA10") {
    couponDiscount = Math.round(totalPrice * 0.1);
  } else if (coupon === "SAVE20" && totalPrice >= 1499) {
    couponDiscount = Math.round(totalPrice * 0.2);
  } else if (coupon === "FIRST100") {
    couponDiscount = Math.min(totalPrice, 100);
  }

  let delivery = 0;
  if (cart.length > 0) {
    if (coupon === "FREESHIP" || totalPrice >= FREE_DELIVERY_ABOVE) {
      delivery = 0;
    } else {
      delivery = DELIVERY_FEE;
    }
  }

  const finalTotal = Math.max(0, totalPrice - couponDiscount + delivery);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toast,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
