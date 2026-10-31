import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { cls: "s1", tag: "COUPON", title: "Extra 10% off your order", text: "Use code APNA10 in your cart.", cta: "Go to Cart", to: "/cart" },
  { cls: "s2", img: "/images/banner-skincare.jpg", tag: "SKINCARE", title: "Healthy, glowing skin", text: "Serums, moisturisers and sunscreen with up to 40% off.", cta: "Shop Skincare", to: "/products?cat=Skincare" },
  { cls: "s3", img: "/images/banner-cosmetics.jpg", tag: "COSMETICS", title: "Makeup you will love", text: "Lipsticks, palettes and more from just ₹199.", cta: "Shop Cosmetics", to: "/products?cat=Cosmetics" },
  { cls: "s4", img: "/images/banner-jewellery.jpg", tag: "LADIES JEWELLERY", title: "Jewellery starting at ₹699", text: "Necklaces, earrings, rings and bangles for every occasion.", cta: "Shop Jewellery", to: "/products?cat=Ladies Jewellery" },
];

export default function OfferSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [i]);

  const go = (n) => setI((n + slides.length) % slides.length);

  return (
    <section className="slider">
      <div className="track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map(({ cls, img, tag, title, text, cta, to }) => (
          <div className={`slide ${cls}`} key={tag}>
            <div className="slide-text">
              <span className="pill">{tag}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link to={to} className="btn btn-light">{cta}</Link>
            </div>
            {img && <img className="slide-img" src={img} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />}
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={() => go(i - 1)} aria-label="Previous"><ChevronLeft /></button>
      <button className="arrow right" onClick={() => go(i + 1)} aria-label="Next"><ChevronRight /></button>

      <div className="dots">
        {slides.map((s, n) => (
          <button key={s.tag} className={n === i ? "dot on" : "dot"} onClick={() => setI(n)} aria-label={`Offer ${n + 1}`} />
        ))}
      </div>
    </section>
  );
}
