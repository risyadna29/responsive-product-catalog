/**
 * SidebarFilter
 * Renders an accordion-style category + sub-category filter list.
 * Supralon expands into 10 nested sub-categories; other categories
 * act as direct toggles.
 */
export default function SidebarFilter({
  categories,
  subCategoriesMap,
  totalCount,
  activeCategory,
  activeSubCategory,
  expandedCategories,
  onSelectAll,
  onSelectCategory,
  onSelectSubCategory,
  products,
}) {
  const countFor = (cat) => products.filter((p) => p.category === cat).length;

  return (
    <nav className="sidebar" aria-label="Filter Kategori">
      <div className="sidebar-heading">Kategori</div>

      {/* All products */}
      <div
        className={`filter-all ${!activeCategory ? 'active' : ''}`}
        onClick={onSelectAll}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectAll()}
        aria-pressed={!activeCategory}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        <span>Semua Produk</span>
        <span className="count">{totalCount}</span>
      </div>

      {/* Per-category */}
      <div className="cat-list">
        {categories.map((cat) => {
          const hasSubs = !!subCategoriesMap[cat];
          const isActive = activeCategory === cat;
          const isOpen = expandedCategories.has(cat);

          return (
            <div className="cat-item" key={cat}>
              <div
                className={`cat-header ${hasSubs ? 'has-sub' : ''} ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
                onClick={() => onSelectCategory(cat, hasSubs)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(cat, hasSubs)}
                aria-expanded={hasSubs ? isOpen : undefined}
                aria-pressed={!hasSubs ? isActive : undefined}
              >
                <span className="cat-dot" />
                <span className="cat-label">{cat}</span>
                <span className="cat-count">{countFor(cat)}</span>
                {hasSubs && (
                  <svg
                    className="chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    width="16"
                    height="16"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>

              {hasSubs && (
                <div className={`sub-list ${isOpen ? 'open' : ''}`} role="list">
                  {subCategoriesMap[cat].map((sub) => (
                    <div
                      key={sub}
                      className={`sub-item ${activeSubCategory === sub ? 'active' : ''}`}
                      onClick={() => onSelectSubCategory(cat, sub)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onSelectSubCategory(cat, sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
