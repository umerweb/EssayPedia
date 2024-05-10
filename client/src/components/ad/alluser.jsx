import  { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon from React Icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllUsers = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchPeople();
  }, []); // Run once on component mount

  const fetchPeople = async () => {
    try {
      const response = await fetch("https://essaypedia.onrender.com/post/allusers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setPeople(data);
      setFilteredPeople(data); // Initially set filtered people to all users
    } catch (error) {
      console.log("Failed to fetch profiles", error);
    }
  };

  const handleSearch = () => {
    const filtered = people.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPeople(filtered);
  };

  const handleRoleFilter = (event) => {
    const role = event.target.value;
    setRoleFilter(role);

    if (role === "all") {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter((user) => user.role === role);
      setFilteredPeople(filtered);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/post/deleteuser/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // After successful deletion, fetch updated list of users
      fetchPeople();
      toast.success("User Deleted Succesfully",{
        theme:"dark"
      })
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 h-screen bg-slate-100 py-8">
      <h1 className="text-center font-semibold mb-5 font text-3xl">Manage Users</h1>
      {/* Search and Filter Section */}
      <div className="flex  items-center bg-white px-3 py-3 justify-between mb-6">
        <div className="relative flex-1 bg-white ">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 px-4 rounded-lg bg-white border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0  px-4 py-2 text-gray-600 hover:text-blue-500"
          >
            <FaSearch />
          </button>
        </div>
        <div className="ml-4">
          <select
            value={roleFilter}
            onChange={handleRoleFilter}
            className="w-48 h-10 px-4 rounded-lg bg-white border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-lg font-semibold text-gray-800 mb-4">
        {filteredPeople.length} result(s) found.
      </p>

      {/* Display Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {user.name}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600 mt-2">
                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => console.log("Clicked on view profile:", user)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
              >
                View Profile
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
