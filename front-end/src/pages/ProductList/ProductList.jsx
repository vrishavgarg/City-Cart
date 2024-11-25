import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const { BusinessName } = useParams();
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState();
  const [totalPages, setTotalPages] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const images = [
    "/productImages/hamburger.jpg",
    "/productImages/pizza.jpg",
    "/productImages/sundae.jpeg",
  ];

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange([min, max]);
  };

  function handlePageChange(pageNumber) {
    setSearchParams((params) => {
      params.set("currentPage", pageNumber);
      return params;
    });
  }

  let productsInDisplay = filteredProducts?.slice(
    (Number(searchParams.get("currentPage")) - 1) * 12,
    Number(searchParams.get("currentPage")) * 12
  );

  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    setFilteredProducts(filteredProducts);
    setTotalPages(Math.ceil(filteredProducts.length / 12));
    setSearchParams((params) => {
      params.set("currentPage", 1);
      return params;
    });
  }, [priceRange, sortOrder]);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .post("http://localhost:8080/getProducts", {
          companyName: BusinessName.split("_").join(" "),
        })
        .then((data) => {
          setProducts(data.data.Products);
          setFilteredProducts(data.data.Products);
          setTotalPages(Math.ceil(data.data.Products.length / 12));
          setSearchParams((params) => {
            params.set("currentPage", 1);
            return params;
          });
        })
        .catch((err) => console.log(err));
    };
    getProducts();
  }, [BusinessName]);

  return (
    <div className="flex flex-col h-[80vh] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Explore Products Offered by {BusinessName.split("_").join(" ")}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Sort Dropdown */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium">
            Sort by Price
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label htmlFor="price-range" className="block text-sm font-medium">
            Price Range
          </label>
          <select
            id="price-range"
            onChange={handlePriceRangeChange}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="0-1000">All</option>
            <option value="0-100">0 - 100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1000</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-auto overflow-y-auto">
        {productsInDisplay?.map((product, index) => (
          <ProductCard
            product={product}
            key={product.name}
            image={images[index]}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={Number(searchParams.get("currentPage"))}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
