import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null); // State to store user data
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        // Fetch post data
        const postResponse = await fetch(`https://essaypedia.onrender.com/post/${postId}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await postResponse.json();
        setPost(postData);

        // Fetch user data using userId from post data
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

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  const datePost = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col my-14">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 italic font-semibold">
        {post.uni}
      </div>
      <p className="text-gray-600">{datePost(post.createdAt)}</p>
      <div className="mt-4 prose">
        <p>{post.content}</p>
      </div>
      <div className="mt-4 text-gray-600 font-semibold">
        <b>Author:</b> {user.username}
      </div>

      {post.link && (
        <div className="mt-4 bg-green-300 rounded-sm p-4">
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex items-center font-bold text-sm text-green-800 hover:underline">
            <lord-icon
              src="https://cdn.lordicon.com/ezjqphcn.json"
              trigger="hover"
              style={{ width: '30px' }}
            >
            </lord-icon>
            AT THIS PAGE YOU CAN DOWNLOAD THE WHOLE ESSAY.
          </a>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
