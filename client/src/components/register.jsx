import { useState, useEffect, useRef } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LoaderButton from './loaderButton';
import { useForm } from "react-hook-form";


const Register = () => {
  const [isloading , setisloading] = useState(false)
  const [modal, setModal] = useState(false);

  
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const lock = useRef();
  const lockref = useRef();
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (user !== null) {
      navigate('/')

    }


  }, [user])

  // const [regform, setregform] = useState({
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: ''
  // })
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const handleregister = async (formData) => {
    setisloading(true)
    

    try {
      let res = await fetch("http://localhost:3000/register/", { method: "POST", headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ ...regform })
       body: JSON.stringify({ name: formData.name, username: formData.username, email: formData.email, password: formData.password })
      });

      let data = await res.json()
      //console.log(data)

      if (data.error) {
        toast.error(data.error,{
          theme: "dark"
        })
        setisloading(false)

      } else {
        // setregform({
        //   name: '',
        //   username: '',
        //   email: '',
        //   password: ''
        // })
        setisloading(false)
        setModal(true)
        toast.success('Registration Succesful! Login Here',{
          theme:"dark"
        })
        reset()
        //navigate('/login')
        
      }


    } catch (error) {
      console.log("Sorry Server is down", error)
      setisloading(false)

    }





  }

  // const handleChange = (e) => {
  //   setregform({ ...regform, [e.target.name]: e.target.value })

  // }

  const showpassword = () => {
    lockref.current.type = "password"
    if (lock.current.src.includes("padlock.png")) {
      lock.current.src = "unlock.png"
      lockref.current.type = "text"

    } else {
      lock.current.src = "padlock.png"
      lockref.current.type = "password"
    }


  }

  return (
    
    <div className="flex z-0 pt-11 flex-col md:flex-row  justify-center items-center min-h-[90vh] bg-slate-100">
       {modal ? (
        
           <div className="bg-white z-50 shadow-lg transform transition-all duration-300 ease-in-out p-6 flex justify-center items-center rounded-md fixed h-[40vh] w-[50vw] flex-col animate-fadeIn">
          <div className="flex justify-end items-center w-full">
            <i
              onClick={closeModal}
              className="cursor-pointer text-lg fas fa-times"
            ></i>
          </div>
          <div className="flex justify-center items-center flex-col">
            <i className="fas fa-check-circle text-green-500 text-5xl"></i>
            <p className="text-3xl font-semibold mt-4">Success!</p>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              An email has been sent to your email address. Please verify
              your email.
            </p>
          </div>
        </div>
        
       
        
      ) : null}
      <div className=" right-container animate-slide-from-right md:rounded-tl-md md:rounded-bl-md  bg-slate-800 min-w-[90vw] md:min-w-[40vw] md:min-h-[75vh] min-h-[40vh] flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url(lp.png)" }}>
        <p className="text-white font-bold text-xl sm:text-3xl md:text-4xl  text-center ">Sign up to <br /> post essays for <br /> free</p>

      </div>
      <div className="left-container animate-slide-from-left   flex flex-col min-w-[90vw] md:min-w-[40vw] md:mb-0 mb-9 justify-center min-h-[75vh] md:rounded-tr-md md:rounded-br-md  bg-white  items-center">
        <h2 className="font font-bold text-3xl mb-4">Register</h2>
        <form className="flex flex-col justify-center items-start gap-2" onSubmit={handleSubmit(handleregister)} >

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="id-card.png" className="w-5" />
            <input 
              placeholder="Name"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="text"
              name="name"
              id="fullname"
              
              {...register("name", { required: true, minLength: 4, maxLength: 20 })}
            /></div>
            <div className="flex justify-end items-center   w-full">
          {errors.name && errors.name.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>

          )}
          {errors.name && errors.name.type === "minLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Minlength is: 4 </span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Maxlength is: 20 </span>
          )}
          
          </div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="username.png" className="w-5" />
            <input 
              placeholder="Username"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="text"
              name="username"
              id="username"
              {...register("username", { required: true, minLength: 4, maxLength: 20 })}
            /></div>
            <div className="flex justify-end items-center   w-full">
          {errors.username && errors.username.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>

          )}
          {errors.username && errors.username.type === "minLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Minlength is: 4 </span>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Maxlength is: 20 </span>
          )}
          
          </div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="email.png" className="w-5" />
            <input 
              placeholder="Email"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="email"
              name="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              id="email"
            /></div>
              <div className="flex justify-end items-center   w-full">
             {errors.email && errors.email.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>

          )}
          {errors.email && errors.email.type === "pattern" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Invalid email </span>
          )}</div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="padlock.png" className="w-5 cursor-pointer" onClick={showpassword} ref={lock} />
            <input 
              ref={lockref}
              placeholder="Password"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="password"
              name="password"
              {...register("password", { required: true, minLength: 8, maxLength: 16 })}
              id="password"
            /></div>
             <div className="flex justify-end items-center   w-full">
             {errors.password && errors.password.type === "required" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">Required</span>

          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">MinLength is: 8 </span>
          )}
           {errors.password && errors.password.type === "maxLength" && (
            <span className="error bg-red-700 pl-2 pr-2 mr-1 text-white rounded-full p-1 little">MaxLength is: 16 </span>
          )}
          </div>


          {isloading ? (<LoaderButton/>):( <button  className="bg-yellow-500 w-[100%] h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-3">Register</button>)}
          <p>Already a User? <Link className="text-blue-500 cursor-pointer" to="/login">Sign Up</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Register
