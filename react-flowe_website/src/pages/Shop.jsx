import { useState } from "react";
import ProductFilters from "../components/shop/ProductFilters";
import ProductGrid from "../components/shop/ProductGrid";
import { products } from "../data/products";

const Shop = () => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 2000,
  });

  const filteredProducts = products.filter(p => {
    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(p.category);
    const priceMatch =
      p.price >= filters.minPrice && p.price <= filters.maxPrice;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 flex gap-10">
      <ProductFilters filters={filters} setFilters={setFilters} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Shop;