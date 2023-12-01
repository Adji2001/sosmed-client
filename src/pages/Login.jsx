import { useRef } from 'react'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/authUser/action'

const Login = () => {
  const email = useRef()
  const password = useRef()
  
  const dispatch = useDispatch()

  const clickHandler = (e) => {
    e.preventDefault()

    dispatch(setAuthUser(email.current.value, password.current.value))
  }

  return (
    <div className="flex flex-col gap-3 items-center w-2/5 mx-auto overflow-hidden rounded-2xl bg-opacity-40 bg-slate-700 border border-slate-500 text-slate-100 p-3" style={{backdropFilter: "blur(20px)"}}>
        <h1 className='text-2xl font-black mt-10'>Welcome on Batur Luah app!</h1>
        <form onSubmit={clickHandler} className='flex flex-col gap-3 items-center w-full'>
          <input type="email" ref={email} placeholder='Your email' required className='w-[70%] p-3 text-slate-900 outline-none rounded mt-16' />
          <input type="password" ref={password} placeholder='Your password' required minLength={6} className='w-[70%] p-3 text-slate-900 outline-none rounded' />
          <button type='submit' className='w-[70%] p-3 flex items-center justify-center bg-blue-500 rounded'>{'login' || <RingLoader color="#ffffff" size={24} />}</button>
        </form>
        <span className='text-blue-500'><a href="#">Forgot password?</a></span>
        <p>Don&apos;t have any account? <Link to="/register" className='text-blue-500 font-bold'>Register here</Link></p>
        <span className='text-sm text-slate-300 mt-16'>copyright &copy; Abd Majid 2023</span>
    </div>
  )
}

export default Login