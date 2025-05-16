import { useEffect, useState } from "react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import Loader from "../../Loader";
import ToggleDarkMode from "../../ToggleDarkMode";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSignIn = () => {
  alert(`Email: ${email}\nPassword: ${password}`);
};

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#dff3ff] to-[#e8ecf3] dark:from-gray-900 dark:to-gray-800 font-sans px-4 transition">
      <ToggleDarkMode />
      <div className="flex flex-col lg:flex-row backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden transition-all duration-300 ease-in-out">
        
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center flex-col px-10 text-white bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-indigo-800 dark:via-indigo-700 dark:to-blue-800">
          <img
            src="/workspace.svg"
            alt="Workspace"
            className="w-3/4 mb-6 opacity-90 drop-shadow-xl"
          />
          <h2 className="text-3xl font-semibold mb-2">Welcome to Your Workspace</h2>
          <p className="text-lg text-center text-white/90">
            “Where every task meets purpose, and progress feels personal.”
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 text-gray-800 dark:text-gray-100">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          >
            SIGN IN
          </button>

          <div className="mt-6 text-center text-sm">Or sign in with</div>
          <div className="flex justify-center gap-6 mt-4 text-xl">
            <button className="hover:text-red-600 transition">
              <FaGoogle />
            </button>
            <button className="hover:text-black transition">
              <FaGithub />
            </button>
            <button className="hover:text-blue-700 transition">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin