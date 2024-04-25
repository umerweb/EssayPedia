import { UserContext } from "../../context/userContext"
import { useContext } from "react"

const Welcome = () => {
  const { user,  logout } = useContext(UserContext); // Access setUser from UserContext

  const handleLogout = async () => {
    await logout();
    // Additional logic after logout, if needed
  };

  return (
    <div>
    <h1>Dashboard</h1>
    {user ? (
      <div>
        <h2>Hi {user.name}!</h2>
      
        <p>{user.email}</p>
     
     
      </div>
    ) : (
      <div>
        <h2>Welcome, Guest!</h2>
        {/* Render login or signup buttons here */}
      </div>
    )}
  </div>

  );
}

export default Welcome;
