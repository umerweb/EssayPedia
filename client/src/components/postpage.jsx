import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader'; // Import your loader component

const PostList = () => {
  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch('https://essaypedia.onrender.com/post/allposts');
        const usersResponse = await fetch('https://essaypedia.onrender.com/post/allusers');

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        // Combine posts with user data
        const postsWithUsersData = postsData.map(post => {
          const user = usersData.find(user => user._id === post.userId);
          return {
            ...post,
            username: user ? user.username : 'Unknown', // Assuming 'username' is the property in user data
          };
        });

        setPostsWithUsers(postsWithUsersData);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures useEffect runs only once

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

  const filteredPosts = postsWithUsers.filter(post =>
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  return (
    <div className='bg-gray-100 min-h-screen'>
      {isLoading ? ( // Check if loading, display loader if true
        <Loader />
      ) : (
        <div className='container mx-auto py-10 px-4 md:px-8'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-lg md:text-2xl py-4'>All Posts</h1>
            <div className='flex '>
              
            <select
              className='bg-white border border-gray-300 rounded-md px-2 py-1'
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="theology/humanuties">Theology/Humanuties</option>
              <option value="socialscience/law">Socialscience/Law</option>
              <option value="biology/geology">Biology/Geology</option>
              <option value="physices/chemistry/math">Physices/Chemistry/Math</option>
              <option value="fineart">Fineart</option>
              <option value="technology">Technology</option>
              <option value="medicine">Medicine</option>
              <option value="agriculture/veterinary/forestry">Agriculture/Veterinary/Forestry</option>
            </select>
              <div className='bg-white border flex items-center border-gray-300 px-2 py-1 md:px-4 rounded-md'>
              <input
                type="text"
                placeholder="Search posts"
                className="bg-transparent outline-none border-none w-24 md:w-48"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <img src="search.png" className="w-5 h-5 ml-2" alt="Search Icon" />
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-start'>
            {filteredPosts.length === 0 && searchQuery && ( // Check if there are no search results and search query is not empty
              <div className='min-h-[70vh] font2'>No results found for <b>{searchQuery}</b></div>
            )}
            {filteredPosts.map(post => (
              <div className='md:w-full' key={post._id}>
                <div className='bg-gray-200 my-4 md:p-4 p-2 flex flex-col justify-between rounded-md shadow-md' >
                  <Link to={`/posts/${post._id}`}><h2 className='font-bold text-lg md:text-xl hover:underline hover:text-blue-600'>{post.title}</h2></Link>
                  <p>{datePost(post.createdAt)}</p>
                  <p className='italic text-gray-700 text-md font-semibold'>{post.uni}</p>
                  <p className='font2'><b>Abstract: </b>{limitWords(post.content, 100)}</p>
                  <p><b>Author:</b> {post.username}</p>
                  <p><b>Category:</b> {post.category}</p>
                  <Link to={`/posts/${post._id}`} className='text-blue-600 hover:underline'>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;

{/*import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader'; // Import your loader component

const PostList = () => {
  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch('http://localhost:3000/post/allposts');
        const usersResponse = await fetch('http://localhost:3000/post/allusers');

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        // Combine posts with user data
        const postsWithUsersData = postsData.map(post => {
          const user = usersData.find(user => user._id === post.userId);
          return {
            ...post,
            username: user ? user.username : 'Unknown', // Assuming 'username' is the property in user data
          };
        });

        setPostsWithUsers(postsWithUsersData);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures useEffect runs only once

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

  const filteredPosts = postsWithUsers.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-slate-100 min-w-[100vh]'>
      {isLoading ? ( // Check if loading, display loader if true
        <Loader />
      ) : (
        <div className='flex flex-col bg-slate-100 px-4 md:px-24 py-10  '>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-md md:text-2xl py-4'> All Posts</h1>
            <div className='bg-white border-2 flex border-gray-300 px-2 py-1 md:px-4 :py-2 rounded-md'>
              <input
                type="text"
                placeholder="Search posts"
                className="bg-white border-none outline-none rounded-md  "
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <img src="search.png" className="md:w-6 w-5 h-5" />
            </div>
          </div>
          <div className='flex flex-col justify-center items-start'>
            {filteredPosts.length === 0 && searchQuery && ( // Check if there are no search results and search query is not empty
              <div className='min-h-[70vh] font2'>No results found for <b>{searchQuery}</b></div>
            )}
            {filteredPosts.map(post => (
              <div className='md:w-full' key={post._id}>
                <div className='bg-slate-200  min-h-60 w-full my-4 md:p-4 p-2 flex flex-col justify-between rounded-md ' >
                  <Link to={`/posts/${post._id}`}><h2 className='font-bold text-lg md:text-xl hover:underline hover:text-blue-600'>{post.title}</h2></Link>
                  <p>{datePost(post.createdAt)}</p>
                  <p className='italic text-slate-700 text-md font-semibold'>{post.uni}</p>
                  <p className='font2'><b>Abstract: </b>{limitWords(post.content, 100)}</p>
                  <p><b>Author:</b> {post.username}</p>
                  <Link to={`/posts/${post._id}`}><p className='hover:underline hover:text-blue-600'>Read More</p></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
*/}