import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  async function handleSignIn() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${URL}/user/signin`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-cyan-100">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 font-semibold"
          >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
