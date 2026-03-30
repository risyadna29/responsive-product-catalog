import { useState } from "react";
import Header from "./components/Header";
import CatalogPage from "./pages/CatalogPage";
import Footer from "./components/Footer";

/**
 * App
 * Root component. Owns search query state (shared between Header and CatalogPage)
 * and the mobile drawer toggle.
 *
 * Routing strategy: hash-based (#/products, #/products/supralon/hdpe)
 * managed inside CatalogPage via history.replaceState.
 */
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  console.log("App rendered");

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setDrawerOpen((v) => !v)}
      />
      <CatalogPage
        searchQuery={searchQuery}
        drawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
      />
      <Footer />
    </>
  );
}
