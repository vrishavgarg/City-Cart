import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BusinessCard from "./BusinessCard";
import Pagination from "../../components/Pagination";
import axios from "axios";

const BusinessList = () => {
  const { CityId, CategoryId } = useParams();
  const navigate = useNavigate();

  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [totalPages, setTotalPages] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();

  let businessInDisplay = filteredBusinesses.slice(
    (Number(searchParams.get("currentPage")) - 1) * 5,
    Number(searchParams.get("currentPage")) * 5
  );

  function handlePageChange(pageNumber) {
    setSearchParams((params) => {
      params.set("currentPage", pageNumber);
      return params;
    });
  }

  useEffect(() => {
    const getCompanies = async () => {
      await axios
        .get("http://localhost:8080/getCompanies")
        .then((data) => {
          const filtered = data.data.Companies.filter(
            (business) =>
              business.city.toLowerCase() === CityId.toLowerCase() &&
              business.category.toLowerCase() ===
                CategoryId.toLowerCase().split("_").join(" ")
          );
          setFilteredBusinesses(filtered);
          setTotalPages(Math.ceil(filtered.length / 5));
          setSearchParams((params) => {
            params.set("currentPage", 1);
            return params;
          });
        })
        .catch((err) => console.log(err));
    };
    getCompanies();
  }, [CityId, CategoryId]);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-[80vh] flex flex-col">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Businesses in {CityId} - {CategoryId.split("_").join(" ")}
        </h1>
        <p className="text-gray-600">
          Explore top-rated {CategoryId.split("_").join(" ")} in your area
        </p>
      </div>

      {/* Business Cards Section */}
      {businessInDisplay.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          {businessInDisplay.map((business) => (
            <div key={business.companyName} className="mb-6">
              <BusinessCard business={business} onClick={handleCardClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600 mt-8 flex-1">
          <h2>No such category found</h2>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={Number(searchParams.get("currentPage"))}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BusinessList;
