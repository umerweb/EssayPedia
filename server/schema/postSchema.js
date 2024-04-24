import { mongoose } from "mongoose";


const Posts = new mongoose.Schema({
    "userId": String,
    "title": String,
    "content": String,
    "uni": String,
    "link":String,
    "createdAt": {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new post is created
      }
    
    
});


const newPosts = mongoose.model('Posts' , Posts )//first argument is the name of collection in db second is schema name

export default newPosts;