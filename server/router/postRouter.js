import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import postSchema from '../schema/postSchema.js'
import userSchema from '../schema/registerSchema.js'
import catSchema from '../schema/catSchema.js'



import 'dotenv/config'
import cookieParser from 'cookie-parser';

const router = express.Router()
router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
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

router.post('/cat', async (req, res) => {
  const {cat } = req.body;
  try {
    const newCat = await catSchema.create({ cat });
    res.json({ success: true, category: newCat });
} catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category', details: error.message });
}

});

router.get('/api/cats', async (req, res) => {
  try {
    const cats = await catSchema.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});


router.get('/api/latest', async (req, res) => {
  try {
    // Query the database to fetch ten latest posts sorted by createdAt in descending order
    const posts = await postSchema.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
      .limit(10); // Limit to 10 documents

    res.json(posts); // Send the fetched posts as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;