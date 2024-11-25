import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

function Header() {
  const { authData, logout } = useAuth(); // Using AuthContext for authentication data
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authData?.email.length > 0); // Check if user is logged in
  }, [authData]);

  const handleLogout = () => {
    logout(); // Clear auth data
    setIsLoggedIn(false);
  };

  return (
    <nav className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-extrabold tracking-wide hover:text-blue-500 transition">
            City Cart
          </div>
        </Link>

        {/* Profile Image and Navigation Links */}
        <div className="flex items-center space-x-8">
          {isLoggedIn ? (
            <>
              {/* Add Products */}
              <Link
                to="/add-product"
                className="font-medium hover:text-blue-400 transition"
              >
                Add Products
              </Link>

              {/* Show Products */}
              <Link
                to={`/products/${authData?.companyName.split(" ").join("_")}`}
                className="font-medium hover:text-blue-400 transition"
              >
                Show Products
              </Link>

              {/* Profile Image */}
              <img
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp" // Dummy profile image URL
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-full shadow-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/registration"
                className="font-medium hover:text-blue-400 transition"
              >
                Free Listing
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded-full shadow-md transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
