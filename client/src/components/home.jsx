import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Scrooll from '../components/scroll';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [newpost, setNewpost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const latestpost = async () => {
    try {
      const response = await fetch('https://essaypedia.onrender.com/post/api/latest');
      if (!response.ok) {
        throw new Error('Failed to fetch latest posts');
      }
      const data = await response.json();
      setNewpost(data);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  };

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    latestpost();
  }, []);

  return (
    <div className="min-h-[100vh] bg-slate-100">
      <Scrooll />
      <div className="flex w-full  flex-col md:min-h-[80vh] min-h-[60vh] justify-center px-3 md:px-20 gap-5" style={{ backgroundImage: "url(bgs.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className='mb-4'>
          {isLoading ? (
            <SkeletonTheme color="#7e1919" highlightColor="#000000">
              <Skeleton height={80} />
            </SkeletonTheme>
          ) : (
            <>
              <h2 className="text-white font-extrabold text-lg md:text-5xl">Unraveling <br /> Perspectives,</h2>
              <div className="flex">
                <p className="text-cyan-300 font-extrabold text-lg md:text-5xl"> One </p><p className="text-white shadow pl-1 text-lg font-extrabold md:text-5xl"> Essay at a Time</p>
              </div>
            </>
          )}
        </div>
        <div>
          <div className="bg-slate-50 md:py-6 py-4 px-2 md:px-8 rounded-sm shadow-lg">
            {isLoading ? (
              <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
                <Skeleton height={50} />
              </SkeletonTheme>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center items-left justify-center md:justify-between">
                <div className="flex w-full items-center mb-4 md:mb-0 md:mr-4">
                  <i className="fas fa-search text-md md:text-lg text-gray-500 mr-2 md:ml-0 ml-4"></i>
                  <input
                    className="text-sm md:text-base  bg-transparent outline-none flex-1 placeholder-slate-500"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Essay Title or Keyword"
                  />
                </div>
                <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                  <select
                    value={selectedCategory}
                    className="text-base bg-transparent rounded-md px-2 py-1 outline-none w-full md:w-auto"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.cat}>
                        {category.cat}
                      </option>
                    ))}
                  </select>
                  <Link to={`/posts/?que=${searchQuery}&cat=${selectedCategory}`}>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md text-sm mt-4 md:mt-0 ml-0 md:ml-4">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='md:px-20 px-3 pt-32 min-h-[80vh] flex flex-col ' style={{ backgroundImage: 'url(bgl.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className='font-bold text-gray-800 text-3xl md:text-5xl'>Explore by Category</h1>
        <div className='mt-12 flex flex-wrap gap-8'>
          {isLoading ? (
            <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
              <Skeleton count={4} height={50} />
            </SkeletonTheme>
          ) : (
            <>
              {categories.map((category) => (
                <Link key={category._id} to={`/posts/?que=&cat=${category.cat}`}>
                  <div className="flex p-4 bg-white justify-start items-center gap-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <i className="fa-solid fa-magnifying-glass text-xl opacity-65"></i>
                    <h2 className='text-slate-700 text-md'>{category.cat}</h2>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='md:px-20 pb-20 px-3 pt-14 min-h-[80vh] flex flex-col gap-4 ' style={{ backgroundImage: 'url(bgr.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div>
          <h2 className='font-bold pb-9 text-gray-800 text-3xl md:text-5xl'>Popular Essays</h2>
        </div>
        {isLoading ? (
          <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
            <Skeleton count={3} height={120} />
          </SkeletonTheme>
        ) : (
          <>
            {newpost.map(post => (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <div className="bg-white p-4  rounded-md  shadow-md transition duration-300 hover:shadow-lg">
                  <div className="mb-4">
                    <h2 className="md:text-lg text-md font-bold text-gray-800 hover:text-blue-600">{post.title}</h2>
                    <p className="text-sm text-gray-600 mb-2 italic font-semibold">{post.uni}</p>
                    <p className="text-sm text-gray-600"><b>Category: </b>{post.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
