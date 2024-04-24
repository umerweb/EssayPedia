import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          credentials: 'include', // Send cookies with the request
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Send cookies with the request
      });
      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}


{/*
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function  UserConetextProvider  ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hjk = async () => {
      try {
        let req = await fetch('http://localhost:3000/profile');
        let data = await req.json();
        setUser(data);
        console.log(data,"data is hear");
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    if (user) {
      hjk();
    }
  }, []);
  
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
*/}