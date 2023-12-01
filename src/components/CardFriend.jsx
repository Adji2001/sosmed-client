import { TbCirclesRelation } from 'react-icons/tb'

const CardFriend = ({user}) => {
  return (
    <div className='flex items-center gap-3 hover:cursor-pointer hover:bg-slate-700 py-2'>
    <img src={import.meta.env.VITE_API_URI + (user.profilePicture || "users/default.jpeg")} alt={user.username} className='h-8 w-8 object-cover rounded-full bg-slate-100' />
    <p>{user.username}</p>
    <span><TbCirclesRelation /></span>
    </div>
  )
}

export default CardFriend