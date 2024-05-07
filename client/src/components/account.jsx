import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Addpost from './post'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Account = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [posts, setPosts] = useState([]);
    

    const handleLogout = async () => {
        await logout();
        // Additional logic after logout, if needed
    };

    useEffect(() => {
        if (user === null) {
            navigate('/');
        }
    }, [user, navigate]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://essaypedia.onrender.com/post/userposts/${user._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const postData = await response.json();
            setPosts(postData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    
    useEffect(() => {
        if (user) {
            fetchPosts();
        }
    }, [user]); // Run fetchPosts when the user state changes

 

    const limitWords = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    const datePost = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const deletepost = async (id) => {
        try {
            const response = await fetch(`https://essaypedia.onrender.com/post/deletepost/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to Delete posts');
            }
            let ans = await response.json();
            toast.success("Post Deleted Successfully!");
            fetchPosts();
            console.log(ans);

        } catch (error) {
            console.error('Error Deleting posts:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="bg-white p-4 shadow-md md:w-1/4">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <TabList className="flex flex-row md:flex-col gap-4 md:gap-0">
                    <Tab className={`py-2 px-4 bg-gray-200 font-semibold text-sm rounded md:mb-2 ${activeTab === 0 && 'bg-yellow-300'}`} onClick={() => setActiveTab(0)}>User Info</Tab>
                    <Tab className={`py-2 px-4 bg-gray-200 font-semibold text-sm rounded md:mb-2 ${activeTab === 1 && 'bg-yellow-300'}`} onClick={() => setActiveTab(1)}>Add Post</Tab>
                    <Tab className={`py-2 px-4 bg-gray-200 font-semibold text-sm rounded md:mb-2 ${activeTab === 2 && 'bg-yellow-300'}`} onClick={() => setActiveTab(2)}>My Posts</Tab>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 md:mt-4">Logout</button>
                </TabList>
            </div>
            <div className="flex-grow bg-gray-100 p-4 shadow-md md:w-3/4">
                <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
                    <TabPanel>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Hi {user && user.name}!</h2>
                            <div className="space-y-2">
                                <p className="text-base font-semibold">Full Name: {user && user.name}</p>
                                <p className="text-base font-semibold">Email: {user && user.email}</p>
                                <p className="text-base font-semibold">Username: {user && user.username}</p>
                               
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="p-4">
                            <Addpost />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
                            {posts.length > 0 ? (
                                <div className="space-y-4">
                                    {posts.map(post => (
                                        <div key={post._id} className="bg-gray-200 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <Link to={`/posts/${post._id}`} className="text-lg font-bold hover:underline hover:text-blue-600">{post.title}</Link>
                                                <i onClick={() => deletepost(post._id)} className="fas fa-trash cursor-pointer text-red-500 hover:text-red-700"></i>
                                            </div>
                                            <p className="text-gray-600">{datePost(post.createdAt)}</p>
                                            <p className="italic">{post.uni}</p>
                                            <p className="font2">{limitWords(post.content, 50)}</p>
                                            <p><b>Category:</b> {post.category}</p>
                                            <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">Read More</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>You have not posted anything yet.</div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Account;
