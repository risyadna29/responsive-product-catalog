import { useState, useMemo, useCallback } from 'react';
import productsData from '../data/products.json';

export function useCatalogData() {
  const products = productsData.products;

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const subCategoriesMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const subs = [
        ...new Set(
          products
            .filter((p) => p.category === cat && p.subCategory)
            .map((p) => p.subCategory)
        ),
      ];
      if (subs.length) map[cat] = subs;
    });
    return map;
  }, [categories, products]);

  return { products, categories, subCategoriesMap };
}

export function useFilter(products) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const selectCategory = useCallback((cat, hasSubs) => {
    if (hasSubs) {
      setExpandedCategories((prev) => {
        const next = new Set(prev);
        next.has(cat) ? next.delete(cat) : next.add(cat);
        return next;
      });
      setActiveCategory(cat);
      setActiveSubCategory(null);
    } else {
      setActiveCategory((prev) => (prev === cat ? null : cat));
      setActiveSubCategory(null);
    }
  }, []);

  const selectSubCategory = useCallback((cat, sub) => {
    setActiveCategory(cat);
    setActiveSubCategory((prev) => (prev === sub ? null : sub));
  }, []);

  const clearFilter = useCallback(() => {
    setActiveCategory(null);
    setActiveSubCategory(null);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.category === activeCategory;
      const matchSub = !activeSubCategory || p.subCategory === activeSubCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subCategory || '').toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q);
      return matchCat && matchSub && matchSearch;
    });
  }, [products, activeCategory, activeSubCategory, searchQuery]);

  return {
    activeCategory,
    activeSubCategory,
    searchQuery,
    setSearchQuery,
    expandedCategories,
    filtered,
    selectCategory,
    selectSubCategory,
    clearFilter,
  };
}