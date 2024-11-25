import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext
import { useNavigate } from "react-router-dom"; // For redirect after successful form submission
import axios from "axios";

function AddProduct() {
  const { authData } = useAuth(); // Get logged-in user's data
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description } = productData;
    if (!name || !price || !description) {
      setError("All fields are required!");
      setSuccess("");
      return;
    }
    const product = {
      ...productData,
      companyName: authData?.companyName,
    };
    console.log("Product added:", product);
    await axios
      .post("http://localhost:8080/addProduct", product)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setSuccess("Product added successfully!");
          setError("");
          setProductData({
            name: "",
            price: "",
            description: "",
          });
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add a Product
        </h2>

        {/* Show error or success message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        {/* Product Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product price"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product description"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
