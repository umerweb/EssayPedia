import { mongoose } from "mongoose";


const category = new mongoose.Schema({
    "cat": String
   
});


const cat = mongoose.model('categs' , category )//first argument is the name of collection in db second is schema name

export default cat;