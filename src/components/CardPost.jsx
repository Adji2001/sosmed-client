import { FcLike } from 'react-icons/fc'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import { FaRegComment } from 'react-icons/fa6'

const CardPost = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex items-center gap-3'>
            <img src={`${import.meta.env.VITE_API_URI}users/user4.jpeg`} alt="foto" className='h-8 w-8 object-cover rounded-full bg-slate-100' />
            <p>Abd Majid</p>
        </div>
        <div className='flex flex-col gap-2 my-2'>
            <p className='text-sm font-normal'>Hello my friends, welcome to my <strong>batur luah</strong> app. Enjoy your time.</p>
            <img src={`${import.meta.env.VITE_CURRENT_URI}website.png`} alt="web" className='w-full bg-slate-200 rounded-lg' />
            <div className='flex items-center gap-3 mt-2 text-xl'>
                <FcLike className='text-2xl cursor-pointer' />
                <FaRegComment className='cursor-pointer text-yellow-200' />
                <PiPaperPlaneTiltFill className='cursor-pointer text-blue-500' />
            </div>
        </div>
    </div>
  )
}

export default CardPost