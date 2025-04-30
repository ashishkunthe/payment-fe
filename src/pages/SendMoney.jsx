import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function SendMoney() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recipientId = queryParams.get("id");
  const recipientName = queryParams.get("name");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!recipientId || !recipientName) {
      setStatus("Recipient information is missing.");
    }
  }, [recipientId, recipientName]);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!recipientId || !amount || isNaN(amount) || amount <= 0) {
      setStatus("Please fill in all fields with a valid amount.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/account/transfer`,
        {
          to: recipientId,
          amount,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStatus(`Successfully sent ₹${amount} to ${recipientName}`);
      setAmount("");
      navigate("/dashboard");
    } catch (error) {
      setStatus("Error sending money. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Send Money to {recipientName}
        </h2>

        <form onSubmit={handleSendMoney} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {status && (
            <p
              className={`text-center text-sm ${
                status.includes("Error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 font-semibold"
          >
            {loading ? "Sending..." : "Send Money"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMoney;
