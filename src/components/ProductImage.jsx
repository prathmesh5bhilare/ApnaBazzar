import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function ProductImage({ product, className = "", alt }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const imageSrc = product.image;

  if (imageSrc && !failed) {
    return (
      <div className={`pimg-wrapper ${loaded ? "is-loaded" : "is-loading"} ${className}`}>
        <img
          className={`pimg ${loaded ? "fade-in" : "loading"}`}
          src={imageSrc}
          alt={alt || product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
        {!loaded && <div className="pimg-skeleton" />}
      </div>
    );
  }

  return (
    <div className={`pimg-wrapper ${className}`}>
      <div className="pimg art">
        <div className="art-overlay">
          <Sparkles size={28} className="art-sparkle" />
          <span className="art-name">{product.name}</span>
          <span className="art-tag">{product.category}</span>
        </div>
      </div>
    </div>
  );
}
