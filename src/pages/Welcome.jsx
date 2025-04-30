import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome to PayApp
        </h1>
        <p className="text-gray-600 mb-6">
          Fast and secure payments, made easy.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
