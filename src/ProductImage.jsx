import { useState } from "react";

const tints = {
  Skincare: ["#e3f1ea", "#0e6b4f"],
  Cosmetics: ["#f7e9e7", "#9b4a4a"],
  "Ladies Jewellery": ["#f6efd9", "#9a7418"],
};

export default function ProductImage({ product }) {
  const [failed, setFailed] = useState(false);

  if (product.image && !failed) {
    return <img className="pimg" src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />;
  }

  const [light, strong] = tints[product.category] || tints.Skincare;

  return (
    <div className="pimg art" style={{ "--t1": light, "--t2": strong }}>
      <span className="art-name">{product.name}</span>
    </div>
  );
}
