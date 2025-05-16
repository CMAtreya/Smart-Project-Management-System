import { useState } from "react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (3-50 characters)
    if (!formData.name) {
      newErrors.name = "Please provide a name";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }
    
    // Email validation
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!formData.email) {
      newErrors.email = "Please provide an email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email";
    }
    
    // Password validation (min 6 characters)
    if (!formData.password) {
      newErrors.password = "Please provide a password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setServerError("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await authService.register(formData);
      console.log("Registration successful", response);
      
      // Redirect based on user role
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setServerError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d6ebff] px-4 font-sans">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#d6ebff] flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            WELCOME TO YOUR WORKSPACE
          </h1>
          <p className="text-xl text-gray-800 mb-8 text-center italic">
            "Where every task meets purpose, and progress feels personal."
          </p>
          <img
            src="/teamwork.svg"
            alt="Teamwork"
            className="w-4/5 mb-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=Team+Collaboration";
            }}
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">SIGN UP</h2>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="inline-flex items-center text-gray-600">
                <input 
                  type="checkbox" 
                  className="form-checkbox text-blue-600" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            {serverError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">-Sign up Via-</p>
            <div className="flex justify-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaGoogle className="h-6 w-6 text-[#DB4437]" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaGithub className="h-6 w-6 text-gray-800" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaLinkedin className="h-6 w-6 text-[#0A66C2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;