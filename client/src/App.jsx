
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from "../context/userContext";
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Account from "./components/account";
import Post from "./components/post"
import PostPage from "./components/postpage"
import SinglePost from './components/singlePost';
import Footer from './components/footer'
import Home from './components/home'
import Admin from './components/admin'
import AdminLogin from './components/adminlogin'
import VerifyEmail from './components/verifyemailsend'
import './App.css'



function App() {


  return (
    <UserContextProvider>
      <Navbar />

      
      <ToastContainer />
      <Routes>
        <Route path='/posts' element={<PostPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/register/verify/:userId' element={<VerifyEmail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
        <Route path='/newpost' element={<Post />} />
        <Route path='/posts/:postId' element={<SinglePost />} />
        <Route path='/dashboard' element={<Admin />} />
        <Route path='/super-admin' element={<AdminLogin />} />

      </Routes>
      <Footer />

    </UserContextProvider>
  )
}

export default App
