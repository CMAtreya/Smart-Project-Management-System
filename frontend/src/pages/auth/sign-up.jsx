import { useState, useEffect } from "react";

const quotes = [
  "Efficiency is doing things right; effectiveness is doing the right things.",
  "Teamwork divides the task and multiplies the success.",
  "Quality means doing it right when no one is looking.",
  "Work smart. Get things done. No nonsense. Move fast.",
  "Great things in business are never done by one person."
];

// Mock icon components
const GoogleIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24">
    <path fill="#DB4437" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-6 w-6" fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsAdminMode(!isAdminMode);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: !isAdminMode ? "admin" : "user"
      });
      setAdminSecretKey("");
      setErrors({});
      setServerError("");
      setIsFlipping(false);
    }, 300);
  };

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

    // Admin secret key validation
    if (isAdminMode && !adminSecretKey.trim()) {
      newErrors.adminSecretKey = "Admin secret key is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Set loading state and clear previous errors
    setIsSubmitting(true);
    setServerError("");
    
    try {
      // Validate form
      if (!validateForm()) {
        console.error("Validation errors:", errors);
        setIsSubmitting(false);
        return;
      }
      
      // Prepare registration data
      const registrationData = isAdminMode 
        ? { ...formData, adminSecretKey }
        : formData;

      console.log(`${isAdminMode ? 'Admin' : 'User'} registration attempt:`, registrationData);
      
      // Simulate API call
      setTimeout(() => {
        setServerError(`${isAdminMode ? 'Admin' : 'User'} registration successful! Redirecting to sign in...`);
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error during registration:", error);
      setServerError("Registration failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 p-10 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-8">WELCOME TO YOUR WORKSPACE</h1>
          <div className="relative h-32 text-lg italic font-medium">
            {quotes.map((q, i) => (
              <p
                key={i}
                className={`absolute transition-opacity duration-1000 ${
                  i === quoteIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                "{q}"
              </p>
            ))}
          </div>
          <p className="mt-10 text-sm text-blue-300">
            Where every task meets purpose, and progress feels personal.
          </p>
        </div>

        {/* Right Side with Flip Animation */}
        <div className="md:w-1/2 p-8 text-white">
          <div className={`transition-opacity duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-900 rounded p-1 flex border border-gray-700">
                <button
                  type="button"
                  onClick={handleFlip}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    !isAdminMode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  User Register
                </button>
                <button
                  type="button"
                  onClick={handleFlip}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    isAdminMode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Admin Register
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">
              {isAdminMode ? 'Admin Sign Up' : 'Sign Up'}
            </h1>

            <div>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full rounded px-4 py-2 bg-gray-900 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500 text-white`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full rounded px-4 py-2 bg-gray-900 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500 text-white`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`w-full rounded px-4 py-2 bg-gray-900 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500 text-white`}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Admin Secret Key - Only shown in admin mode */}
              {isAdminMode && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Admin Secret Key</label>
                  <input
                    type="password"
                    value={adminSecretKey}
                    onChange={(e) => setAdminSecretKey(e.target.value)}
                    className={`w-full rounded px-4 py-2 bg-gray-900 border ${
                      errors.adminSecretKey ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:border-blue-500 text-white`}
                    placeholder="Enter admin secret key"
                  />
                  {errors.adminSecretKey && (
                    <p className="text-red-500 mt-1 text-sm">{errors.adminSecretKey}</p>
                  )}
                </div>
              )}

              {/* Remember Me */}
              <div className="mb-4">
                <label className="inline-flex items-center text-gray-300">
                  <input 
                    type="checkbox" 
                    className="text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ml-2">Remember me</span>
                </label>
              </div>

              {/* Server Error/Success */}
              {serverError && (
                <div className={`mb-4 p-2 border rounded ${
                  serverError.includes('successful')
                    ? 'bg-green-900 border-green-600 text-green-300'
                    : 'bg-red-900 border-red-600 text-red-300'
                }`}>
                  {serverError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSignUp}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-6 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                {isSubmitting ? "SIGNING UP..." : `SIGN UP AS ${isAdminMode ? 'ADMIN' : 'USER'}`}
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-4">-Sign up Via-</p>
              <div className="flex justify-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <GoogleIcon />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <GithubIcon />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <LinkedinIcon />
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button className="text-blue-400 hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;