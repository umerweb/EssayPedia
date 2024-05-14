import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderButton from './loaderButton';
import { useForm } from "react-hook-form";

const Login = () => {
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const lock = useRef();
  const lockref = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ showPassword, setshowPassword] = useState(false)

  const handlelogin = async (formData) => {
    setisloading(true);
    try {
      let res = await fetch("https://essaypedia.onrender.com/login/", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      let data = await res.json();
      
      if (data.error) {
        toast.error(data.error, { /* toast config */ });
      } else {
        toast.success('Successfully Logged in', { /* toast config */ });
        setUser(data);
        navigate('/');
      }
    } catch (error) {
      console.log("Login not Successful", error);
    }
    setisloading(false);
  };

  const showpassword = () => {
    
    if (lock.current.src.includes("padlock.png")) {
      lock.current.src = "unlock.png"
      setshowPassword(true)
    

    } else {
      lock.current.src = "padlock.png";
      setshowPassword(false)
     
    }


  }


  return (
    <div className="flex pt-11 flex-col-reverse md:flex-row  justify-center items-center min-h-[90vh] bg-slate-100">
      <div className="right-container animate-slide-from-right flex flex-col min-w-[90vw] md:min-w-[40vw] justify-center min-h-[75vh] md:rounded-tl-md md:rounded-bl-md bg-white  items-center mb-8 md:mb-0">
        <h2 className="font font-bold text-3xl mb-4">Login</h2>
        <form className="flex flex-col justify-center gap-3 items-start" onSubmit={handleSubmit(handlelogin)}>
          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="user.png" className="w-5" alt="user" />
            <input className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          <div className="flex justify-end items-center   w-full">
          {errors.email && errors.email.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>

          )}
          {errors.email && errors.email.type === "pattern" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Invalid email </span>
          )}</div>
          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="padlock.png" className="w-5 cursor-pointer" onClick={showpassword} ref={lock} alt="padlock" />
            <input className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              placeholder="Password"
              ref={lockref}
              type={showPassword?"text":"password"}
              name="password"
              id="password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center   w-full">
          {errors.password && errors.password.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>
          )}</div>
          {isloading ? (
            <LoaderButton />
          ) : (
            <button className="bg-yellow-500 w-[100%] h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-2">Submit</button>
          )}
          <p>Not a User? <Link className=" text-blue-500 cursor-pointer" to="/register">Register</Link></p>
        </form>
      </div>
      <div className=" left-container animate-slide-from-left   md:rounded-tr-md md:rounded-br-md bg-slate-800 min-w-[90vw] md:min-w-[40vw] md:min-h-[75vh] min-h-[40vh] flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url(lp.png)" }}>
        <p className="text-white font-bold text-xl sm:text-3xl md:text-4xl  text-center ">Sign in to <br /> post essays for <br /> free</p>
      </div>
    </div>
  );
}

export default Login;
