import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { products } from '../../data/products';

export default function ProductGrid() {
  const [filters, setFilters] = useState({ categories: [], minPrice: 0, maxPrice: 2000 });
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

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
      <div className="bg-[#f0e0d6] px-4 md:px-12 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#c4957a] mb-2 flex items-center gap-3">
              <span className="w-7 h-px bg-[#c4957a]" /> Our Collection
            </p>
            <h1 className="font-serif text-[28px] md:text-[40px] font-normal text-[#5c3d35]">
              Fresh <em className="italic text-[#c4957a]">Blooms</em> &amp; Bouquets
            </h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-light text-[#a08878]">
              {filtered.length} of {products.length} flowers
            </span>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden text-xs tracking-widest uppercase text-[#8b5e52]
                border border-[#c4957a] px-3 py-2 rounded-sm"
            >
              {filtersOpen ? 'Hide Filters' : '⚙ Filters'}
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="font-[Jost] text-xs font-light text-[#5c3d35] bg-white
                border border-[#e8d5c4] px-3 py-2 rounded-sm outline-none cursor-pointer"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 md:px-12 py-6 md:py-8 max-w-[1300px] mx-auto">

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="md:hidden mb-6 pb-6 border-b border-[#e8d5c4]">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop filters */}
          <div className="hidden md:block w-[220px] shrink-0">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Active filter tags */}
            {filters.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.categories.map(cat => (
                  <span
                    key={cat}
                    onClick={() => setFilters(f => ({
                      ...f,
                      categories: f.categories.filter(c => c !== cat)
                    }))}
                    className="flex items-center gap-1.5 bg-[#f0e0d6] border border-[#e8d5c4]
                      text-[11px] text-[#8b5e52] px-2.5 py-1 rounded-sm cursor-pointer
                      hover:bg-[#e8d5c4] transition-colors"
                  >
                    {cat} <span className="text-[#c4957a]">×</span>
                  </span>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-[#b09088] text-sm">
                No flowers match your filters 🌸
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}