import  { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Dashboard from "../components/ad/dashboard";
import Alluser from "../components/ad/alluser";
import Mnagepost from "../components/ad/manageposts";
import ManageUser from "../components/ad/manageUser";

const App = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in or is not an admin
    if (!user || user.role !== "admin") {
      navigate('/'); // Redirect to the home page or another appropriate route
    }
  }, [user, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Automatically close sidebar on mobile after selecting a tab
    if (!isSidebarOpen) {
      setIsSidebarOpen(true); // Ensure sidebar is open on desktop
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to determine if the user is an admin
  const isUserAdmin = () => {
    return user && user.role === "admin";
  };

  return (
    <>
      {isUserAdmin() ? (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar (Desktop) */}
          <aside className={`bg-gray-800 text-gray-200 w-64 min-h-screen transition-all duration-300 ease-in-out overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
            <div className="p-4">
              <h1 className="text-2xl font-bold text-white mb-4 font">EssayPedia</h1>
              <nav>
                <button
                  className={`w-full py-2 px-4 rounded-lg mb-2 text-left ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleTabClick('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg mb-2 text-left ${activeTab === 'posts' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleTabClick('posts')}
                >
                  All Posts
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg mb-2 text-left ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleTabClick('users')}
                >
                  All Users
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg mb-2 text-left ${activeTab === 'addUser' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleTabClick('addUser')}
                >
                  Add User
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Mobile Header */}
            <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center sm:hidden">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <button onClick={toggleSidebar}>
                {isSidebarOpen ? (
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                )}
              </button>
            </div>

            {/* Main Content */}
            <main >
              {/* Render different components based on activeTab */}
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'posts' && <Mnagepost />}
              {activeTab === 'users' && <Alluser />}
              {activeTab === 'addUser' && <ManageUser />}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">You are not allowed to access this page.</h1>
        </div>
      )}
    </>
  );
};

export default App;
