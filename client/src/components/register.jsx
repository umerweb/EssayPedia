import { useState, useEffect, useRef } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const lock = useRef();
  const lockref = useRef();


  useEffect(() => {
    if (user !== null) {
      navigate('/')

    }


  }, [user])

  const [regform, setregform] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })


  const handleregister = async (e) => {
    e.preventDefault()

    try {
      let res = await fetch("https://essaypedia.onrender.com/register/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...regform }) })
      let data = await res.json()

      if (data.error) {
        toast.error(data.error)

      } else {
        setregform({
          name: '',
          username: '',
          email: '',
          password: ''
        })
        toast.success('Registration Succesful! Login Here')
        navigate('/login')
      }


    } catch (error) {
      console.log("Sorry Server is down", error)

    }





  }

  const handleChange = (e) => {
    setregform({ ...regform, [e.target.name]: e.target.value })

  }

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
    <div className="flex pt-11 flex-col md:flex-row  justify-center items-center min-h-[90vh] bg-slate-100">
      <div className=" md:rounded-tl-md md:rounded-bl-md  bg-slate-800 min-w-[90vw] md:min-w-[40vw] md:min-h-[75vh] min-h-[40vh] flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/lp.png')" }}>
        <p className="text-white font-bold text-xl sm:text-3xl md:text-4xl  text-center ">Sign up to <br /> post essays for <br /> free</p>

      </div>
      <div className="flex flex-col min-w-[90vw] md:min-w-[40vw] md:mb-0 mb-9 justify-center min-h-[75vh] md:rounded-tr-md md:rounded-br-md  bg-white  items-center">
        <h2 className="font font-bold text-3xl mb-4">Register</h2>
        <form className="flex flex-col justify-center items-start gap-3" onSubmit={handleregister}>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="id-card.png" className="w-5" />
            <input onChange={handleChange}
              placeholder="Name"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="text"
              name="name"
              id="fullname"
              value={regform.name}
            /></div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="username.png" className="w-5" />
            <input onChange={handleChange}
              placeholder="Username"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="text"
              name="username"
              id="username"
              value={regform.username}
            /></div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="email.png" className="w-5" />
            <input onChange={handleChange}
              placeholder="Email"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="email"
              name="email"
              value={regform.email}
              id="email"
            /></div>

          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="padlock.png" className="w-5 cursor-pointer" onClick={showpassword} ref={lock} />
            <input onChange={handleChange}
              ref={lockref}
              placeholder="Password"
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              type="password"
              name="password"
              value={regform.password}
              id="password"
            /></div>


          <button onClick={handleregister} className="bg-yellow-500 w-full h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-3">Register</button>

          <p>Already a User? <Link className="text-blue-500" to="/login">Sign Up</Link></p>

        </form>
      </div>
    </div>
  )
}

export default Register
