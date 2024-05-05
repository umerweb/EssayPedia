import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user,  logout } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () =>{
    setIsHovered(false);
  };
  const handleLogout = async () => {
    await logout();
    toast.success('Logged Out Successfully!',{
      theme:"dark"
    })
    // Additional logic after logout, if needed
  };

  return (
    <div className='bg-slate-800 sticky z-50 top-0 w-full flex  min-h-14 items-center justify-between px-4 md:px-20'>
        <div className='font flex justify-center items-center font-bold text-white text-xl'> 
            <Link to="/">EssayPedia</Link>
        </div>
        <ul className='flex gap-4 text-white'>
          
          

          {user ? (
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link to="/account">Hi, {user.name}</Link>
              { isHovered && (
                <div style={{ minWidth:'120px',color:'#2E2E2E', display:'flex',flexDirection:'column',padding: '10px', position: 'absolute', top: '39px', backgroundColor: '#DEDEDE', borderRadius:'7px' }}>
                  <Link  to="/account">Account</Link>
                  <hr style={{ borderTop: '1px solid #2E2E2E', margin: '5px 0' }} />
                  <p style={{ cursor:'pointer' }} onClick={handleLogout}>Logout</p>
                  
                </div>
              )}
            </li>
          ) : (
            <>
              <li className=" min-h-8 min-w-16 flex justify-center items-center rounded-sm hover:bg-green-500 border border-s-white bg-slate-800"><Link to="/login">Login</Link></li>
              <li className=" min-h-8 min-w-20 flex justify-center items-center rounded-sm hover:bg-green-500 border border-s-white bg-slate-800"><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
    </div>
  )
}

export default Navbar;
