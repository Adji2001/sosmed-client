import { BiDotsHorizontal } from 'react-icons/bi'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const FeedTop = ({post, hideHandler, user}) => {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
            <Link to={`profile/${user.username}`}>
              {
                user
                ? <img src={import.meta.env.VITE_API_URI + (user.profilePicture || "users/default.jpeg")} alt={user.username} className='bg-slate-100 w-8 h-8 object-cover rounded-full' />
                : <Skeleton className="w-8 h-8" baseColor='rgb(100 116 139)' highlightColor='rgb(148 163 184)' circle={true} />
              }
              
            </Link>
            {
              user.username
              ? <h5 className='text-sm font-semibold'>{user.username}</h5>
              : <Skeleton className='w-36 h-8' baseColor='rgb(100 116 139)' highlightColor='rgb(148 163 184)' />
            }
        </div>
        <div className='flex gap-2'>
            <span className='text-xs'>{format(post.createdAt)}</span>
            <BiDotsHorizontal onClick={hideHandler} className='text-lg hover:cursor-pointer' />
        </div>
    </div>
  )
}

export default FeedTop