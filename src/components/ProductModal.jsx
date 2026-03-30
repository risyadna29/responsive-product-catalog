import { useState, useEffect, useCallback } from "react";

/**
 * ProductModal / ProductGallery + SpecsTable
 * Shows full product detail with image gallery and dynamic specs table.
 */
export default function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);

  // Reset gallery when product changes
  useEffect(() => {
    setActiveImg(0);
  }, [product]);

  // Close on Escape
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay open"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-name"
    >
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            name={product.name}
            activeImg={activeImg}
            onThumbClick={setActiveImg}
          />

          {/* Info */}
          <div className="modal-info">
            <span className="modal-cat-tag">
              {product.subCategory
                ? `${product.category} › ${product.subCategory}`
                : product.category}
            </span>
            <h3 className="modal-product-name" id="modal-product-name">
              {product.name}
            </h3>
            <p className="modal-desc">{product.desc}</p>
            <SpecsTable specs={product.specs} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────── */

function ProductGallery({ images, name, activeImg, onThumbClick }) {
  return (
    <div className="modal-gallery">
      <div className="modal-main-img">
        <img src={images[activeImg]} alt={name} width="400" height="400" />
      </div>
      {images.length > 1 && (
        <div className="modal-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`modal-thumb ${activeImg === i ? "active" : ""}`}
              onClick={() => onThumbClick(i)}
              aria-label={`Gambar ${i + 1}`}
            >
              <img src={img} alt={`${name} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecsTable({ specs }) {
  // Handle dynamic type with custom columns
  if (specs.type === "dynamic" && specs.columns && specs.data) {
    return (
      <div>
        <div className="specs-table-title">Spesifikasi Teknis</div>
        <table className="specs-table" aria-label="Tabel Spesifikasi">
          <thead>
            <tr>
              {specs.columns.map((col, idx) => (
                <td key={idx}>{col}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(specs.data).map(([key, val], idx) => (
              <tr key={key} className={idx % 2 === 0 ? "even" : "odd"}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle table type (with multiple rows - like Size/Meter/Roll)
  if (specs.type === "table" && specs.columns && specs.rows) {
    return (
      <div>
        <div className="specs-table-title">Spesifikasi Teknis</div>
        <table className="specs-table" aria-label="Tabel Spesifikasi">
          <thead>
            <tr>
              {specs.columns.map((col, idx) => (
                <td key={idx}>{col}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "even" : "odd"}>
                {specs.columns.map((col, colIdx) => (
                  <td key={colIdx}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Fallback to old structure (backward compatible)
  // Filter out non-string values to avoid rendering objects
  const entries = Object.entries(specs).filter(
    ([, val]) => typeof val === "string" || typeof val === "number",
  );

  if (entries.length === 0) {
    return null; // No valid specs to display
  }

  return (
    <div>
      <div className="specs-table-title">Spesifikasi Teknis</div>
      <table className="specs-table" aria-label="Tabel Spesifikasi">
        <thead>
          <tr>
            <td>Spesifikasi</td>
            <td>Nilai</td>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, val], idx) => (
            <tr key={key} className={idx % 2 === 0 ? "even" : "odd"}>
              <td>{key}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
