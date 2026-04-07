// src/components/shop/ProductGrid.jsx
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { products } from '../../data/products';

export default function ProductGrid() {
  const [filters, setFilters] = useState({ categories: [], minPrice: 0, maxPrice: 2000 });
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile filter drawer

  const filtered = useMemo(() => {
    let result = [...products];
    if (filters.categories.length > 0)
      result = result.filter(p => filters.categories.includes(p.category));
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [filters, sort]);

  return (
    <div className="bg-[#fdf6f0]">

      {/* Header */}
      <div className="bg-[#f0e0d6] px-5 md:px-12 py-8 md:py-10
        flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#c4957a] mb-2
            flex items-center gap-3">
            <span className="w-7 h-px bg-[#c4957a]" /> Our Collection
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[30px] md:text-[40px]
            font-normal text-[#5c3d35]">
            Fresh <em className="italic text-[#c4957a]">Blooms</em> &amp; Bouquets
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-light text-[#a08878]">
            {filtered.length} of {products.length} flowers
          </span>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="font-[Jost] text-xs font-light text-[#5c3d35] bg-white
              border border-[#e8d5c4] px-3 py-2 rounded-sm outline-none cursor-pointer">
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          {/* Mobile filter toggle */}
          <button onClick={() => setFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 text-xs uppercase tracking-widest
              text-[#8b5e52] border border-[#e8d5c4] px-3 py-2 rounded-sm bg-white">
            <SlidersHorizontal size={13} /> Filters
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[320px]
            bg-[#fdf6f0] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-[Cormorant_Garamond] text-xl text-[#5c3d35]">Filters</span>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={20} className="text-[#8b5e52]" />
              </button>
            </div>
            <ProductFilters filters={filters} setFilters={setFilters} />
            <button onClick={() => setFiltersOpen(false)}
              className="w-full mt-6 text-xs tracking-widest uppercase text-white
                bg-[#c4957a] hover:bg-[#b0806a] py-3 rounded-sm transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="px-5 md:px-12 py-6 md:py-8 max-w-[1300px] mx-auto
        grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0">

        {/* Desktop Sidebar */}
        <div className="hidden md:block pr-8 border-r border-[#e8d5c4]">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Products */}
        <div className="md:pl-8">
          {/* Active tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.categories.map(cat => (
              <span key={cat}
                onClick={() => setFilters(f => ({
                  ...f, categories: f.categories.filter(c => c !== cat)
                }))}
                className="flex items-center gap-1.5 bg-[#f0e0d6] border border-[#e8d5c4]
                  text-[11px] text-[#8b5e52] px-2.5 py-1 rounded-sm cursor-pointer
                  hover:bg-[#e8d5c4] transition-colors">
                {cat} <span className="text-[#c4957a]">×</span>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}