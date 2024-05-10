import { useState, useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Mangeuser = () => {


  const lock = useRef();
  const lockref = useRef();



  const [regform, setregform] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: ''
  })



  const handleregister = async (e) => {
    e.preventDefault()

    try {
      let res = await fetch("http://localhost:3000/register/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...regform }) })
      let data = await res.json()
      console.log(data)

      if (data.error) {
        toast.error(data.error, {
          theme: "dark"
        })

      } else {
        setregform({
          name: '',
          username: '',
          email: '',
          password: ''
        })

        toast.success('New User added Successfully', {
          theme: "dark"
        })

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
    <div className="flex z-0 pt-11 flex-col md:flex-row h-screen  justify-center items-center min-h-[90vh] bg-slate-100">

      <div className="left-container animate-slide-from-left   flex flex-col min-w-[90vw] md:min-w-[40vw] md:mb-0 mb-9 justify-center min-h-[75vh] md:rounded-tr-md md:rounded-br-md  bg-white  items-center">
        <h2 className="font font-bold text-3xl mb-4">Add a New User</h2>
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


          <div className="bg-slate-200 w-full flex justify-start items-center py-2 px-4 rounded-full">
          <i className="fa-solid text-lg fa-user"></i>
            <select
              value={regform.role}
              className="bg-slate-200 text-sm border-none outline-none font-semibold placeholder-slate-800 pl-2"
              onChange={handleChange}
              name="role"
            >
              <option value="all">Select Role</option>

              <option value="user">User</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>

            </select></div>




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


          <button onClick={handleregister} className="bg-yellow-500 w-full h-9 rounded-lg text-white font-semibold hover:bg-red-900 mt-3">Add User</button>



        </form>
      </div>
    </div>
  )
}

export default Mangeuser
