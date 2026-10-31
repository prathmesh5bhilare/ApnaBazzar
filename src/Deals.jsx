import { products } from "./products";
import ProductCard from "./ProductCard";

export default function Deals() {
  const deals = products
    .filter((p) => p.discount >= 30)
    .sort((a, b) => b.discount - a.discount);

  return (
    <>
      <div className="deal-banner">
        <h2>Mega Deals</h2>
        <p>Everything here is 30% off or more. Grab it before it is gone!</p>
      </div>
      <div className="grid">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
