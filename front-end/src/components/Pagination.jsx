const Pagination = (children) => {
  const handlePrev = () => {
    if (children.currentPage > 1)
      children.onPageChange(children.currentPage - 1);
  };

  const handleNext = () => {
    if (children.currentPage < children.totalPages)
      children.onPageChange(children.currentPage + 1);
  };

  const handlePageClick = (page) => {
    if (page !== children.currentPage) children.onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={children.currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          children.currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(children.totalPages).keys()].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 border rounded-md ${
              children.currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={children.currentPage === children.totalPages}
        className={`px-4 py-2 border rounded-md ${
          children.currentPage === children.totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
