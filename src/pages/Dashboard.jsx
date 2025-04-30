import { useEffect, useState } from "react";
import axios from "axios";
import Users from "../components/Users";

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get(`${URL}/account/balance`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800">PayVerse</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Welcome to your payments dashboard
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-blue-100">
          <span className="text-lg font-medium text-gray-700">
            Your Balance
          </span>
          <span className="text-2xl font-bold text-green-600">₹{balance}</span>
        </div>

        {/* Users List Placeholder */}
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
