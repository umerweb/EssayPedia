import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { mongoose } from "mongoose";
import authRouter from './router/authRouter.js';
import postRouter from './router/postRouter.js'
import cookieParser from "cookie-parser";
import 'dotenv/config'



/// Data base connected
mongoose.connect(process.env.mongo_url)
.then(()=> console.log("Conected to database"))
.catch((err)=> console.log("Database not connected", err))

const app = express()
const port = 3000

app.use(express.json()) 
app.use(cors({ credentials: true, origin: 'https://essaypedia-1.onrender.com' }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use('/', authRouter)
app.use('/post', postRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})