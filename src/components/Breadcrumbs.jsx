/**
 * Breadcrumbs
 * Displays contextual navigation: Katalog > Category > SubCategory
 */
export default function Breadcrumbs({ activeCategory, activeSubCategory, onSelectAll, onSelectCategory }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a
        href="#/products"
        onClick={(e) => { e.preventDefault(); onSelectAll(); }}
      >
        Katalog
      </a>

      {activeCategory && (
        <>
          <span className="sep" aria-hidden="true">/</span>
          <a
            href={`#/products/${activeCategory.toLowerCase().replace(/\s/g, '-')}`}
            onClick={(e) => { e.preventDefault(); onSelectCategory(activeCategory, false); }}
          >
            {activeCategory}
          </a>
        </>
      )}

      {activeSubCategory && (
        <>
          <span className="sep" aria-hidden="true">/</span>
          <span className="current" aria-current="page">{activeSubCategory}</span>
        </>
      )}
    </nav>
  );
}
