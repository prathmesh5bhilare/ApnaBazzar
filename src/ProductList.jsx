import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "./products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("cat") || "All";

  const [maxPrice, setMaxPrice] = useState(60000);
  const [sort, setSort] = useState("popular");

  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === "All") next.delete("cat");
    else next.set("cat", c);
    setParams(next);
  };

  let filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category || p.group === category) &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(q.toLowerCase())
  );

  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <div className="section-head">
        <h2>{q ? `Results for "${q}"` : "All Products"}</h2>
        <span className="muted">{filtered.length} items</span>
      </div>

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filters">
        <label>
          Max Price: <b>₹{maxPrice.toLocaleString("en-IN")}</b>{" "}
          <input
            type="range" min="500" max="60000" step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Sort by:{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No products match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </>
  );
}
