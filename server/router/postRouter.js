import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import postSchema from '../schema/postSchema.js'
import userSchema from '../schema/registerSchema.js'



import 'dotenv/config'
import cookieParser from 'cookie-parser';

const router = express.Router()
router.use(cors({ credentials: true, origin: 'https://essaypedia-1.onrender.com' }));
router.use(bodyParser.json())

router.use(cookieParser())



router.get('/',  (req, res) => {
  
    res.send("hello world i am post endpoint")
  })
  router.post('/', async(req, res)=>{
    const { userId, title, uni, link, category, content} = req.body;
    const newPost = await postSchema.create({
        userId,
        title,
        uni,
        link,
        category,
        content
    })
    res.json({ success: true, post: newPost });

}) 
router.get('/allposts', async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await postSchema.find();
      res.json(posts); // Send the posts as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/allusers', async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await userSchema.find();
      res.json(posts); // Send the posts as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await postSchema.findById(postId).lean();
    
  
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
      
    }
  
    res.json(post);
  });

  
  router.get('/userposts/:upostId', async (req, res) => {
    const postId = req.params.upostId;
    const posts = await postSchema.find({ userId: postId });

    
  
    if (!posts) {
      return res.status(404).json({ error: 'Post not found' });
      
    }
  
    res.json(posts);
  });
  router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userSchema.findById(userId).lean();
    
  
    if (!user) {
      return res.status(404).json({ error: 'Post not found' });
      
    }
  
    res.json(user);
  });

  router.delete('/deletepost/:postdelId', async (req, res) => {
    try {
        const delId = req.params.postdelId;
        const post = await postSchema.deleteOne({ _id: delId });
        
        if (!post) {
            return res.status(404).json({ error: 'Could not delete the post' });
        }
        
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;