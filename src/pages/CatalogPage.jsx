import { useState, useEffect } from "react";
import { useCatalogData, useFilter } from "../hooks/useFilter";
import SidebarFilter from "../components/SidebarFilter";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

export default function CatalogPage({
  searchQuery,
  drawerOpen,
  onCloseDrawer,
}) {
  const { products, categories, subCategoriesMap } = useCatalogData();

  console.log(
    "CatalogPage: products =",
    products.length,
    "categories =",
    categories.length,
  );

  const {
    activeCategory,
    activeSubCategory,
    expandedCategories,
    filtered,
    setSearchQuery,
    selectCategory,
    selectSubCategory,
    clearFilter,
  } = useFilter(products);

  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync search query dari Header ke filter hook
  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  // Update document title & URL hash
  useEffect(() => {
    let title = "Katalog Produk – PT Tjakrindo Mas";
    let hash = "/products";
    if (activeCategory) {
      const slug = activeCategory.toLowerCase().replace(/\s/g, "-");
      hash += `/${slug}`;
      title = `${activeCategory} – Katalog PT Tjakrindo Mas`;
    }
    if (activeSubCategory) {
      const slug = activeSubCategory.toLowerCase().replace(/[\s/]/g, "-");
      hash += `/${slug}`;
      title = `${activeCategory} ${activeSubCategory} – Katalog PT Tjakrindo Mas`;
    }
    document.title = title;
    history.replaceState(null, "", `#${hash}`);
  }, [activeCategory, activeSubCategory]);

  const pageTitle = activeSubCategory
    ? `${activeCategory} › ${activeSubCategory}`
    : activeCategory || "Semua Produk";

  const handleSelectCategory = (cat, hasSubs) => {
    selectCategory(cat, hasSubs);
    if (drawerOpen) onCloseDrawer();
  };
  const handleSelectSubCategory = (cat, sub) => {
    selectSubCategory(cat, sub);
    if (drawerOpen) onCloseDrawer();
  };
  const handleSelectAll = () => {
    clearFilter();
    if (drawerOpen) onCloseDrawer();
  };

  return (
    <>
      {drawerOpen && <div className="drawer-overlay" onClick={onCloseDrawer} />}

      <div className="app-layout">
        <div className={`sidebar-wrapper ${drawerOpen ? "drawer-open" : ""}`}>
          <SidebarFilter
            categories={categories}
            subCategoriesMap={subCategoriesMap}
            totalCount={products.length}
            activeCategory={activeCategory}
            activeSubCategory={activeSubCategory}
            expandedCategories={expandedCategories}
            products={products}
            onSelectAll={handleSelectAll}
            onSelectCategory={handleSelectCategory}
            onSelectSubCategory={handleSelectSubCategory}
          />
        </div>

        <main className="main-content">
          <Breadcrumbs
            activeCategory={activeCategory}
            activeSubCategory={activeSubCategory}
            onSelectAll={handleSelectAll}
            onSelectCategory={(cat) =>
              handleSelectCategory(cat, !!subCategoriesMap[cat])
            }
          />

          <div className="page-title-bar">
            <div>
              <h1 className="page-title">{pageTitle}</h1>
              <p className="page-subtitle">
                {activeCategory
                  ? `Produk lini ${activeCategory} dari PT Tjakrindo Mas`
                  : "Pipa, fitting, dan aksesoris terbaik dari PT Tjakrindo Mas"}
              </p>
            </div>
            <span className="result-count">{filtered.length} produk</span>
          </div>

          <div className="toolbar">
            <div className="toolbar-left">
              {activeCategory && (
                <div className="active-filter-chip">
                  {activeCategory}
                  {activeSubCategory ? ` › ${activeSubCategory}` : ""}
                  <button onClick={clearFilter} aria-label="Hapus filter">
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Tampilan Grid"
                aria-pressed={viewMode === "grid"}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="Tampilan List"
                aria-pressed={viewMode === "list"}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <circle
                    cx="3"
                    cy="6"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="3"
                    cy="12"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                  <circle
                    cx="3"
                    cy="18"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </button>
            </div>
          </div>

          <ProductGrid
            products={filtered}
            viewMode={viewMode}
            onProductClick={setSelectedProduct}
          />
        </main>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
