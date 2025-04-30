import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  // Fetch users
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          `${URL}/user/bulk?filter=${debouncedFilter}`
        );
        setUsers(response.data.user);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    getUsers();
  }, [debouncedFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Search Users
        </h2>
        <input
          type="text"
          placeholder="Enter a name or email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <h2 className="text-xl font-semibold text-blue-700 mb-4">All Users</h2>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-50 transition"
            >
              <span className="text-lg font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={() =>
                  navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`)
                }
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send Money
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
