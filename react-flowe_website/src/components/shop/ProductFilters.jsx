// src/components/shop/ProductFilters.jsx
export default function ProductFilters({ filters, setFilters }) {
  const categories = ['Roses', 'Wildflowers', 'Lavender', 'Tulips'];

  const toggleCategory = (cat) => {
    setFilters(f => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter(c => c !== cat)
        : [...f.categories, cat]
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] font-medium text-[#5c3d35] tracking-wide">Filters</span>
        <button onClick={() => setFilters({ categories: [], minPrice: 0, maxPrice: 2000 })}
          className="text-[11px] tracking-widest uppercase text-[#c4957a]
            hover:text-[#8b5e52] bg-transparent border-none cursor-pointer transition-colors">
          Clear All
        </button>
      </div>

      <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#5c3d35] mb-3">
        Category
      </p>
      <div className="flex flex-col gap-2.5 mb-6">
        {categories.map(cat => (
          <label key={cat} onClick={() => toggleCategory(cat)}
            className="flex items-center gap-2.5 cursor-pointer">
            <div className={`w-[15px] h-[15px] rounded-sm border flex items-center
              justify-center transition-colors flex-shrink-0
              ${filters.categories.includes(cat)
                ? 'bg-[#c4957a] border-[#c4957a]'
                : 'bg-white border-[#c4957a]'}`}>
              {filters.categories.includes(cat) && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <span className="text-[13px] font-light text-[#7a5c52]">{cat}</span>
          </label>
        ))}
      </div>

      <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#5c3d35] mb-3">
        Price Range
      </p>
      <div className="flex items-center gap-2 mb-2">
        <input type="number" placeholder="₹0" value={filters.minPrice}
          onChange={e => setFilters(f => ({ ...f, minPrice: +e.target.value }))}
          className="w-[72px] text-xs font-light text-[#5c3d35] border border-[#e8d5c4]
            px-2.5 py-1.5 rounded-sm outline-none bg-white focus:border-[#c4957a] transition-colors" />
        <span className="text-xs text-[#b09088]">—</span>
        <input type="number" placeholder="₹2000" value={filters.maxPrice}
          onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
          className="w-[72px] text-xs font-light text-[#5c3d35] border border-[#e8d5c4]
            px-2.5 py-1.5 rounded-sm outline-none bg-white focus:border-[#c4957a] transition-colors" />
      </div>
    </div>
  );
}