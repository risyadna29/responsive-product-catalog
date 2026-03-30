import ProductCard from './ProductCard';

/**
 * ProductGrid
 * Renders filtered products in a responsive grid or list layout.
 */
export default function ProductGrid({ products, viewMode, onProductClick }) {
  if (!products.length) {
    return (
      <div className="empty-state" role="status">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
        <h3>Produk Tidak Ditemukan</h3>
        <p>Coba ubah filter atau kata kunci pencarian.</p>
      </div>
    );
  }

  return (
    <div
      className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}
      role="list"
      aria-label="Daftar Produk"
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}
