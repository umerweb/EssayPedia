import { UserContext } from "../../context/userContext";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Post = () => {
    const { user } = useContext(UserContext);
    const [newPost, setNewPost] = useState({
        userId: user ? user._id : '',
        title: '',
        uni:'',
        link:'',
        content: ''
    });

    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const createPost = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://essaypedia.onrender.com/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            });
            const data = await res.json();
            console.log(data);
            setNewPost({
                userId: user ? user._id : '',
                title: '',
                uni:'',
                link:'',
                content: ''
            })
            toast.success(" Posted SuccesFully")
        } catch (error) {
            console.error(error);
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
                            /></div>
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
