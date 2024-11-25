import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";

function HeroBanner() {
  const params = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(
    params.CityId ? params.CityId : "Delhi"
  );
  const [category, setCategory] = useState("");

  function handleSubmit() {
    if (!location || !category) return;
    navigate(`/${location}/${category.split(" ").join("_")}`);
  }

  return (
    <div className="relative flex items-center justify-center h-[600px] bg-cover bg-center bg-no-repeat hero-bg--img">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          Discover Your City
        </h1>
        <div className="h-1 w-[80px] bg-white mx-auto mb-6 rounded"></div>
        <div className="flex rounded-full border border-gray-300 bg-white overflow-hidden w-full max-w-3xl mt-10">
          {/* Location Input */}
          <div className="flex items-center w-1/3 bg-gray-50 bg-opacity-80">
            <FaLocationDot className="h-6 w-6 text-green-600 ml-5" />
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-12 px-4 py-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-300 my-3" />

          {/* Category Dropdown */}
          <div className="flex items-center w-2/3 bg-gray-50 bg-opacity-80 relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="appearance-none w-full h-12 px-4 py-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              {[
                "Food & Beverage",
                "Hospitality",
                "Retail",
                "Health & Wellness",
                "Entertainment",
                "Education",
                "Technology",
                "Transportation",
                "Home Services",
                "Arts & Crafts",
                "Finance",
                "Non-Profit/Community",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <FaMagnifyingGlass
              className="h-6 w-6 text-yellow-500 mr-5 cursor-pointer transition-transform transform hover:scale-110 absolute right-2"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
