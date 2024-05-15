import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const postResponse = await fetch(`https://essaypedia.onrender.com/post/${postId}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await postResponse.json();
        setPost(postData);

        const userResponse = await fetch(`https://essaypedia.onrender.com/post/user/${postData.userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostAndUser();
  }, [postId]);

  const datePost = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col my-14 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl md:text-4xl font-bold mb-4">
        {post ? post.title : <Skeleton count={2} />}
      </h1>
      <div className="text-gray-600 italic font-semibold mb-2">
        {post ? post.uni : <Skeleton width={200} />}
      </div>
      <p className="text-gray-600 mb-4">
        {post ? datePost(post.createdAt) : <Skeleton width={150} />}
      </p>
      <div className="mt-4 prose lg:prose-xl">
        {post ? <p>{post.content}</p> : <Skeleton count={15} />}
      </div>
      <div className="mt-4 text-gray-600 font-semibold">
        <b>Author:</b> {user ? user.username : <Skeleton width={100} />}
      </div>

      {post?.link ? (
        <div className="mt-4 bg-green-100 rounded-lg p-4">
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex items-center font-bold text-sm text-green-800 hover:underline">
            <lord-icon
              src="https://cdn.lordicon.com/ezjqphcn.json"
              trigger="hover"
              style={{ width: '30px' }}
            >
            </lord-icon>
            <span className="ml-2">AT THIS PAGE YOU CAN DOWNLOAD THE WHOLE ESSAY.</span>
          </a>
        </div>
      ) : (
        <Skeleton height={40} />
      )}
    </div>
  );
};

export default SinglePost;
