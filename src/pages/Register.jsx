import axios from "axios"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})

const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({
      password,
      confirmPassword
    })

    if (confirmPassword.current.value !== password.current.value) {
      await Toast.fire({
        icon: 'error',
        title: "Password don't match!",
      })
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }

      try {
        await axios.post(`${import.meta.env.VITE_API_URI}api/auth/register`, user)
        await Toast.fire({
          icon: 'success',
          title: "Register successfully!",
        })
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="flex flex-col gap-3 items-center w-2/5 mx-auto overflow-hidden rounded-2xl bg-opacity-40 bg-slate-700 border border-slate-500 text-slate-100 p-3" style={{backdropFilter: "blur(20px)"}}>
        <h1 className='text-3xl font-black mt-10'>Register now</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center w-full">
          <input type="text" ref={username} placeholder='Username' className='w-[70%] p-3 text-slate-900 outline-none rounded mt-10' />
          <input type="email" ref={email} placeholder='Email' className='w-[70%] p-3 text-slate-900 outline-none rounded' />
          <input type="password" ref={password} placeholder='Password' className='w-[70%] p-3 text-slate-900 outline-none rounded' />
          <input type="password" ref={confirmPassword} placeholder='Confirm Password' className='w-[70%] p-3 text-slate-900 outline-none rounded' />
          <button type="submit" className='w-[70%] p-3 bg-blue-500 rounded'>Register</button>
        </form>
        <p>Already have any account? <Link to="/login" className='text-blue-500 font-bold'>Login here</Link></p>
        <span className='text-sm text-slate-300 mt-5'>copyright &copy; Abd Majid 2023</span>
    </div>
  )
}

export default Register

