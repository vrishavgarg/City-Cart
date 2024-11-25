import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Registration() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
  });

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") setConfirmPassword(value);
    else setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!passwordRegex.test(formData.password))
      newErrors.password = "Password does not match the required scheme.";
    if (formData.password !== confirmPassword)
      newErrors.confirmPassword = "Password does not match";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zip) newErrors.zip = "Zip code is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Data Submitted:", formData);
      await axios
        .post("http://localhost:8080/register", formData)
        .then((response) => {
          console.log(response);
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
          setFormData({
            companyName: "",
            email: "",
            password: "",
            phone: "",
            website: "",
            category: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            description: "",
          });
          setConfirmPassword("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen p-8">
      <form
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Company Registration
        </h2>

        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Company Name*
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            placeholder="Enter company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            placeholder="Enter company email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 pr-10 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            (Password must be at least 8 characters long, include an uppercase
            letter, a lowercase letter, a number, and a special character.)
          </p>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Confirm Password*
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 pr-10 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number*
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Website (Optional) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter website URL (optional)"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category*
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Retail">Retail</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Transportation">Transportation</option>
            <option value="Home Services">Home Services</option>
            <option value="Arts & Crafts">Arts & Crafts</option>
            <option value="Finance">Finance</option>
            <option value="Non-Profit/Community">Non-Profit/Community</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address*
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            placeholder="Enter company address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* City, State, Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              City*
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              State*
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Zip Code*
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.zip ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Zip Code"
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Company Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            placeholder="Brief description of your company"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Register Company
        </button>

        {submitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            Your response has been submitted.
          </div>
        )}
      </form>
    </div>
  );
}

export default Registration;
