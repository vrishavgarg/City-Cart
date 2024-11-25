const FilterOptions = (children) => {
  const handleRatingChange = (e) => {
    children.onFilterChange({ ...children.filters, rating: e.target.value });
  };

  const handlePriceChange = (e) => {
    children.onFilterChange({
      ...children.filters,
      priceLevel: e.target.value,
    });
  };

  return (
    <div className="w-full md:w-64 p-4 border rounded-lg shadow bg-white h-64">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Minimum Rating</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleRatingChange}
        >
          <option value="">Any</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
          <option value="3.5">3.5+</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Price Level</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handlePriceChange}
        >
          <option value="">Any</option>
          <option value="$">$ (Budget)</option>
          <option value="$$">$$ (Moderate)</option>
          <option value="$$$">$$$ (Expensive)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
