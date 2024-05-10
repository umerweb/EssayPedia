import { mongoose } from "mongoose";


const Users = new mongoose.Schema({
    "name": String,
    "username": String,
    "email": {
        type: String,
        unique: true
    },
    "password": String,
    "createdAt": {
        type: Date,
        default: Date.now // Automatically set the current date and time when a new post is created
      },
      "role": {
        type: String,
        enum: ['user', 'admin', 'author'], // Another example of enum field
        default: 'user' // Set a default value
      },
    
    
});


const newUsers = mongoose.model('Users' , Users )//first argument is the name of collection in db second is schema name

export default newUsers;