import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";




const Login = () => {


  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const lock = useRef();
  const lockref = useRef();

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch("http://localhost:3000/login/", { method: "POST", credentials: 'include', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...logform }) })
      let data = await res.json();
      //console.log(data ,"i am login api")

      if (data.error) {
        toast.error(data.error)

      } else {
        toast.success("Logged in SuccesFully")
        setlogform({
          email: '',

          password: ''
        })
        setUser(data)
        navigate('/')
      }

    } catch (error) {
      console.log("Login not Successfull", error)

    }

  }

  useEffect(() => {
    if (user !== null) {
      console.log(user)
      navigate('/')

    }
    handlelogin()



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])



  const [logform, setlogform] = useState({

    email: '',

    password: ''
  })


  const handleChange = (e) => {
    setlogform({ ...logform, [e.target.name]: e.target.value })

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
    <div className="flex pt-11 flex-col-reverse md:flex-row  justify-center items-center min-h-[90vh] bg-slate-100">


      <div className="flex flex-col min-w-[90vw] md:min-w-[40vw] justify-center min-h-[75vh] md:rounded-tl-md md:rounded-bl-md bg-white  items-center mb-8 md:mb-0">
        <h2 className="font font-bold text-3xl mb-4">Login</h2>
        <form className="flex flex-col justify-center gap-4 items-start" onSubmit={handlelogin}>



          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="user.png" className="w-5" />
            <input className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={logform.email}
              onChange={handleChange}
            /></div>



          <div className="bg-slate-200 w-full flex justify-center items-center py-2 px-4 rounded-full">
            <img src="padlock.png" className="w-5 cursor-pointer" onClick={showpassword} ref={lock} />
            <input className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              placeholder="Password"
              ref={lockref}
              type="password"

              name="password"
              id="password"
              onChange={handleChange}
              value={logform.password}

            />
          </div>

          <button className="bg-yellow-500 w-[100%] h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-3">Submit</button>
          <p>Not a User? <Link className="text-blue-500" to="/register">Register</Link></p>


        </form>
      </div>
      <div className=" md:rounded-tr-md md:rounded-br-md bg-slate-800 min-w-[90vw] md:min-w-[40vw] md:min-h-[75vh] min-h-[40vh] flex justify-center items-center bg-cover bg-center  " style={{ backgroundImage: "url('/src/assets/lp.png')" }}>
        <p className="text-white font-bold text-xl sm:text-3xl md:text-4xl  text-center ">Sign in to <br /> post essays for <br /> free</p>

      </div>

    </div>
  )
}

export default Login
