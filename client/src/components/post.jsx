import { UserContext } from "../../context/userContext";
import { useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
    const { user } = useContext(UserContext);
    const [newPost, setNewPost] = useState({
        userId: user ? user._id : '',
        title: '',
        uni: '',
        link: '',
        category: '',
        content: ''
    });
    const [categories, setCategories] = useState([]);
   
    // Fetch categories from the backend API
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/post/api/cats');
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
    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });

    };

    const createPost = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            });
            /*const data = */await res.json();
            ///console.log(data);
            setNewPost({
                userId: user ? user._id : '',
                title: '',
                uni: '',
                link: '',
                category: '',
                content: ''
            })
            toast.success(" Posted SuccesFully")
        } catch (error) {
            console.error(error);
         //   console.log(newPost)
        }
    };


    useEffect(() => {
        // If user is not available or userId is null, do nothing
        if (!user || !user._id) return;

        // Update newPost's userId when user becomes available
        setNewPost((prevPost) => ({
            ...prevPost,
            userId: user._id
        }));
    }, [user]); // Run effect whenever user object changes

    return (
        <div className="flex justify-center items-center ">
            <div className="flex flex-col min-w-[80%] ">
                {user ? (
                    <>
                        <h2 className="font font-bold text-3xl my-4">Add a New Post</h2>
                        <form className="flex flex-col justify-center items-start gap-4" onSubmit={createPost}>
                            <input type="hidden" name="userId" value={newPost.userId ?? ''} />
                            <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-sm">
                                <input
                                    onChange={handleChange}
                                    className="bg-slate-200 w-full text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
                                    placeholder="Add Title"
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={newPost.title}
                                    required
                                /></div>
                            <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-sm">
                                <input
                                    onChange={handleChange}
                                    className="bg-slate-200 w-full text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
                                    placeholder="University's Name"
                                    type="text"
                                    name="uni"
                                    id="uni"
                                    value={newPost.uni}
                                    required

                                /></div>
                            <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-sm">
                                <input
                                    onChange={handleChange}
                                    className="bg-slate-200 w-full text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
                                    placeholder="Reference Link"
                                    type="text"
                                    name="link"
                                    id="link"
                                    value={newPost.link}
                                    required
                                /></div>
                            <div className="bg-slate-200  w-full flex justify-center items-center py-2 px-4 rounded-sm">
                            <select
                                    className="flex w-full bg-slate-200 outline-none"
                                    value={newPost.category}
                                    onChange={handleChange}
                                    name="category"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category.cat}>
                                            {category.cat}
                                        </option>
                                    ))}
                                </select></div>
                            <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-sm">
                                <textarea
                                    onChange={handleChange}
                                    className="bg-slate-200 w-full text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
                                    placeholder="Content"
                                    type="text"
                                    name="content"
                                    id="content"
                                    rows={7}
                                    value={newPost.content}
                                    required
                                /></div>
                            <button type="submit" className="bg-yellow-500 w-full h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-3">Post</button>
                        </form>
                    </>
                ) : (
                    <div>Please Login to post</div>
                )}
            </div>
        </div>
    );
};

export default Post;
