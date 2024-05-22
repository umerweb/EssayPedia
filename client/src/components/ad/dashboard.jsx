import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch post count
    fetch('http://localhost:3000/post/posts/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch post count');
        }
        return response.json();
      })
      .then(data => {
        setPostCount(data.count); // Assuming the response has a count property
      })
      .catch(error => {
        console.error('Error fetching post count:', error);
        toast.error('Failed to fetch post count');
      });

    // Fetch user count
    fetch('http://localhost:3000/post/users/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user count');
        }
        return response.json();
      })
      .then(data => {
        setUserCount(data.count); // Assuming the response has a count property
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
        toast.error('Failed to fetch user count');
      });
  }, []); // Run once on component mount

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Post Count</h2>
          <p className="text-3xl font-bold">{postCount}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">User Count</h2>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>
        {/* Add more sections for additional dashboard content */}
      </div>
    </div>
  );
};

export default Dashboard;
