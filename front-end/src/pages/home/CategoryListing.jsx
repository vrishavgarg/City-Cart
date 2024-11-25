import { useNavigate, useParams } from "react-router";
import data from "../../assets/data.json";

function CategoryListing() {
  const { CityId } = useParams();
  const navigate = useNavigate();

  const handleCategory = (categoryName) => {
    navigate(
      `/${CityId ? CityId : "delhi"}/${categoryName
        .toLowerCase()
        .split(" ")
        .join("_")}`
    );
  };
  return (
    <div className="flex flex-col items-center justify-center bg-gray-300 p-32">
      <h1 className="text-5xl font-semibold mb-6 text-gray-600">
        Most Popular Categories
      </h1>
      <div className="h-1 w-[80px] bg-gray-600 mx-auto mb-6 rounded"></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12">
        {data.map((category, index) => (
          <button
            key={index}
            className="flex items-center p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100"
            onClick={() => handleCategory(category.name)}
          >
            <img
              src={category.url}
              alt={category.name}
              className="h-10 w-10 mr-4"
            />
            <span className="text-xl font-medium text-gray-700">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryListing;
