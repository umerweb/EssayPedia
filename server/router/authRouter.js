import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userSchema from '../schema/registerSchema.js'
import { comparePasswords, hashPassword } from '../helpers/hashpass.js';
import tok from 'jsonwebtoken';

import 'dotenv/config'
import cookieParser from 'cookie-parser';

const router = express.Router()


router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
router.use(bodyParser.json())

router.use(cookieParser())

router.get('/',  (req, res) => {
  
  res.send("hello world")
})



router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if email exists
    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail) {
      return res.json({ error: "Email already exists" });
    }

    // Check if username exists
    const existingUsername = await userSchema.findOne({ username });
    if (existingUsername) {
      return res.json({ error: "Username already exists" });
    }
   
   ///hash the password

   const hashedPassword = await hashPassword(password);


    // Create new user
    const newUser = await userSchema.create({
       name, 
       username, 
       email, 
       password: hashedPassword,
       });

    res.json({ success: true, user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Registration Failed", details: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const loginUser = await userSchema.findOne({ email });
    if (!loginUser) {
      return res.json({ error: "Email Does not Exist" });
    }

    // Compare passwords
    const match = await comparePasswords(password, loginUser.password);
    if (match) {
      tok.sign({id: loginUser._id, name: loginUser.name , email: loginUser.email,  username: loginUser.username }, process.env.tok_secret, {} , (err, token)=>{
        if (err) throw err;
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json(loginUser);

          
        
      })
      //return res.json({ success: true, message: "Password matched" });
      
    } else {
      return res.json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.log("Cannot log in", error);
    return res.status(500).json({ error: "Login Failed", details: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json(null);
      
    }

    // Verify the token asynchronously
    tok.verify(token, process.env.tok_secret, async (err, decodedToken) => {
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Once token is verified, use the decoded token to retrieve user data
      const { id } = decodedToken;
      const loginUser = await userSchema.findById(id);
      if (!loginUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the user data
      res.json(loginUser);
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});



router.post('/logout', async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Logout failed', details: error.message });
  }
});


  export default router;