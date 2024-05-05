import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged Out Successfully!', {
      theme: "dark"
    });
    // Additional logic after logout, if needed
  };

  return (
    <div className='bg-gray-900 h-16 z-50 sticky top-0 w-full flex items-center justify-between px-4 md:px-20 py-3 shadow-md'>
      {/* Logo and Title */}
      <div className='flex items-center text-white text-xl font-bold'>
        <Link className="font" to="/">EssayPedia</Link>
      </div>

      {/* Navigation Links */}
      <ul className='flex gap-4 text-white'>
        {user ? (
          // User is logged in
          <li className='relative'>
            <div
              className='cursor-pointer'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Hi, {user.name}
              {isHovered && (
                <div className='absolute top-full left-0 w-40  bg-white shadow-lg rounded-lg py-2 px-4'>
                  <Link to="/account" className='block text-gray-800 hover:text-gray-600 '>
                    Account
                  </Link>
                  <hr className='my-2 border-gray-200' />
                  <p className='block text-gray-800 hover:text-gray-600 cursor-pointer' onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </li>
        ) : (
          // User is not logged in
          <>
            <li className='border rounded hover:bg-gray-800'>
              <Link to="/login" className='block px-3 py-1'>Login</Link>
            </li>
            <li className='border rounded hover:bg-gray-800'>
              <Link to="/register" className='block px-3 py-1'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
