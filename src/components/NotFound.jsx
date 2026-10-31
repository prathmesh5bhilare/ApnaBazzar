import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <div className="not-found-sparkle"><Sparkles size={28} /></div>
        <h2>Page Not Found</h2>
        <p>The beauty or jewellery collection you are looking for may have moved or doesn’t exist.</p>
        <Link to="/" className="btn-primary">
          Back to Homepage <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
