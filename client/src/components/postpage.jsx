import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from './loader'; // Import your loader component


const PostList = () => {
  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Number of posts to display per page
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://essaypedia.onrender.com/post/api/cats');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const que = searchParams.get('que');
    const cat = searchParams.get('cat');
    if (que !== null) {
      setSearchQuery(que);
    }
    if (cat !== null) {
      setSelectedCategory(cat);
    }

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
            username: user ? user.username : 'Unknown',
          };
        });

        setPostsWithUsers(postsWithUsersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, [location.search]);

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

  const filteredPosts = postsWithUsers.filter(post => {
    if (!post.title || !post.content || !post.category) {
      console.error('Invalid post:', post);
      return false;
    }

    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseContent = post.content.toLowerCase();
    const lowerCaseCategory = post.category.toLowerCase();

    return (
      (lowerCaseTitle.includes(searchQuery.toLowerCase()) || lowerCaseContent.includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'all' || lowerCaseCategory === selectedCategory.toLowerCase())
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='bg-gray-100 min-h-screen px-2 md:px-20'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container mx-auto py-10 px-4 md:px-8'>
          <div className="bg-white h-24 flex justify-center ">
            <div className="flex md:flex-row md:py-0 flex-col py-4 w-full justify-between px-8  items-center ">
              <div className="flex  justify-start items-center gap-3 w-full">
                <i className="fa-solid fa-magnifying-glass text-lg md:text-2xl opacity-45"></i>
                <input
                  className="md:text-lg text-md outline-none bg-transparent placeholder-slate-500 w-full"
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Enter Essay Title or Keyword"
                />
              </div>
              <div className="gap-4 flex justify-between">
                <select
                  value={selectedCategory}
                  className="bg-transparent rounded-md px-2 py-1 outline-none w-44"
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.cat}>
                      {category.cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-lg md:text-xl py-4'>
              {searchQuery === '' ? (
                <>All Posts</>
              ) : (
                <><h2>Showing Results for &quot;{searchQuery}&quot;</h2></>
              )}
            </h1>
          </div>
          <div className='flex flex-col justify-center items-start'>
            {filteredPosts.length === 0 && searchQuery && (
              <div className='min-h-[70vh] font2'>
                No results found for <b>{searchQuery}</b>
              </div>
            )}
            {currentPosts.map(post => (
              <div className='md:w-full' key={post._id}>
                <div className='bg-white p-4 my-3  rounded-md  shadow-md transition duration-300 hover:shadow-lg'>
                  <Link to={`/posts/${post._id}`}>
                    <h2 className='font-bold text-lg md:text-xl hover:underline hover:text-blue-600'>{post.title}</h2>
                  </Link>
                  <p>{datePost(post.createdAt)}</p>
                  <p className='italic text-gray-700 text-md font-semibold'>{post.uni}</p>
                  <p className='font2 break-words'><b>Abstract: </b>{limitWords(post.content, 30)}</p>
                  <p><b>Author:</b> {post.username}</p>
                  <p><b>Category:</b> {post.category}</p>
                  <Link to={`/posts/${post._id}`} className='text-blue-600 hover:underline'>Read More</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className='flex justify-center my-4'>
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;

