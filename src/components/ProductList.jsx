import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, RotateCcw, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { products, categories } from "./products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";

export default function ProductList() {
  const [params, setParams] = useSearchParams();
  const { wishlist } = useCart();

  const q = params.get("q") || "";
  const category = params.get("cat") || "All";
  const filterType = params.get("filter") || "";

  const [maxPrice, setMaxPrice] = useState(3500);
  const [sort, setSort] = useState("popular");
  const [minRating, setMinRating] = useState(0);

  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === "All") next.delete("cat");
    else next.set("cat", c);
    next.delete("filter");
    setParams(next);
  };

  const clearFilters = () => {
    setMaxPrice(3500);
    setSort("popular");
    setMinRating(0);
    setParams({});
  };

  const isWishlistMode = filterType === "wishlist";

  const filteredProducts = useMemo(() => {
    let list = isWishlistMode ? wishlist : products;

    list = list.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchPrice = p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchPrice && matchRating && matchSearch;
    });

    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "discount") list = [...list].sort((a, b) => b.discount - a.discount);

    return list;
  }, [category, maxPrice, minRating, q, sort, isWishlistMode, wishlist]);

  return (
    <div className="product-list-page">
      {/* Page Header / Breadcrumbs */}
      <div className="catalog-header">
        <div className="catalog-title-group">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{isWishlistMode ? "My Wishlist" : category === "All" ? "Catalog" : category}</span>
          </div>
          <h1 className="catalog-heading">
            {isWishlistMode
              ? "My Saved Wishlist"
              : q
              ? `Results for "${q}"`
              : category === "All"
              ? "All Curated Products"
              : `${category} Collection`}
          </h1>
          <p className="catalog-subtitle">
            Showing {filteredProducts.length} premium handcrafted beauty and jewellery items
          </p>
        </div>

        {/* Clear Filters Quick Action */}
        {(q || category !== "All" || maxPrice < 3500 || minRating > 0 || isWishlistMode) && (
          <button type="button" className="btn-reset-filters" onClick={clearFilters}>
            <RotateCcw size={15} /> Reset Filters
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      {!isWishlistMode && (
        <div className="category-chips-bar">
          {categories.map((c) => {
            const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                className={`category-chip ${c === category ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                <span>{c}</span>
                <span className="chip-count">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Advanced Filter Toolbar */}
      <div className="filters-toolbar">
        <div className="filter-group">
          <SlidersHorizontal size={16} className="filter-icon" />
          <label className="filter-label">
            Price up to: <b>₹{maxPrice.toLocaleString("en-IN")}</b>
            <input
              type="range"
              min="199"
              max="3500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </label>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            Min Rating:
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value="0">All Ratings</option>
              <option value="4.2">★ 4.2 & Above</option>
              <option value="4.4">★ 4.4 & Above</option>
            </select>
          </label>
        </div>

        <div className="filter-group sort-group">
          <label className="filter-label">
            Sort by:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="filter-select"
            >
              <option value="popular">Popularity</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Highest Discount %</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </label>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="empty-catalog">
          <div className="empty-catalog-icon">
            {isWishlistMode ? <Heart size={54} /> : <ShoppingBag size={54} />}
          </div>
          <h3>No products found</h3>
          <p>
            {isWishlistMode
              ? "Your wishlist is empty. Browse our catalog and tap the heart icon on items you love!"
              : "Try adjusting your price filter or search query to find what you're looking for."}
          </p>
          <button type="button" className="btn-primary" onClick={clearFilters}>
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
