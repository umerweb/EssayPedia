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
      },
    
      "category": {
        type: String,
        enum: ['theology/humanuties', 'socialscience/law', 'biology/geology',
        'physices/chemistry/math','fineart','technology','medicine','agriculture/veterinary/forestry'], // Define the allowed options
        default: 'all' // Set a default value if none is provided
    }
});


const newPosts = mongoose.model('Posts' , Posts )//first argument is the name of collection in db second is schema name

export default newPosts;