/**
 * ProductCard
 * Displays a single product in the grid / list view.
 */
export default function ProductCard({ product, onClick, index }) {
  // Handle new specs format (type: "dynamic" or "table")
  let specEntries = [];

  if (product.specs.type === "dynamic" && product.specs.data) {
    specEntries = Object.entries(product.specs.data).slice(0, 3);
  } else if (product.specs.type === "table" && product.specs.rows) {
    // For table type, show first 3 sizes
    specEntries = product.specs.rows
      .slice(0, 3)
      .map((row, idx) => [
        `${product.specs.columns[0]} ${idx + 1}`,
        row[product.specs.columns[0]],
      ]);
  } else {
    // Fallback for old format - filter out non-string/non-number values
    specEntries = Object.entries(product.specs)
      .filter(([, val]) => typeof val === "string" || typeof val === "number")
      .slice(0, 3);
  }

  return (
    <article
      className="card"
      style={{ "--i": index }}
      onClick={() => onClick(product)}
      onKeyDown={(e) => e.key === "Enter" && onClick(product)}
      tabIndex={0}
      role="button"
      aria-label={`Lihat detail ${product.name}`}
    >
      <div className="card-img">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width="400"
          height="400"
        />
        <span className="card-badge">
          {product.subCategory || product.category}
        </span>
      </div>

      <div className="card-body">
        <div className="card-cat">{product.category}</div>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-specs">
          {specEntries.map(([key, val]) => (
            <div className="spec-row" key={key}>
              <span className="spec-key">{key}</span>
              <span className="spec-val">{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <span className="detail-btn">
          Lihat Detail
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="14"
            height="14"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
}
