import React, { useState, useEffect } from "react";

const quotes = [
  "Efficiency is doing things right; effectiveness is doing the right things.",
  "Teamwork divides the task and multiplies the success.",
  "Quality means doing it right when no one is looking.",
  "Work smart. Get things done. No nonsense. Move fast.",
  "Great things in business are never done by one person."
];

export default function App() {
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [errors, setErrors] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email format";
    if (!password.trim()) errs.password = "Password is required";
    if (userType === "admin" && adminCode !== "SECRET123") errs.adminCode = "Invalid admin code";

    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      setErrors({});
      alert(`Logged in as ${userType.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#161b22] rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 p-10 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-8">THE FUTURE OF WORK</h1>
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
            Empowering productivity and collaboration for the modern workplace.
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

          {/* Toggle Admin/Employee */}
          <div className="flex mb-6 justify-center space-x-4">
            <button
              onClick={() => setUserType("admin")}
              className={`px-6 py-2 rounded-t-lg font-semibold ${
                userType === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-[#0d1117] text-gray-400 hover:text-white"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserType("employee")}
              className={`px-6 py-2 rounded-t-lg font-semibold ${
                userType === "employee"
                  ? "bg-blue-600 text-white"
                  : "bg-[#0d1117] text-gray-400 hover:text-white"
              }`}
            >
              Employee
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500`}
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500`}
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
            </div>

            {/* Admin Code */}
            {userType === "admin" && (
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Admin Code</label>
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                    errors.adminCode ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Enter secret admin code"
                />
                {errors.adminCode && (
                  <p className="text-red-500 mt-1 text-sm">{errors.adminCode}</p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-6 rounded font-semibold transition"
            >
              Sign In as {userType === "admin" ? "Admin" : "Employee"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}