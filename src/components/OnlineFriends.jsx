import { Link } from 'react-router-dom'
import CardFriend from './CardFriend'
import CardOtherFriend from './CardOtherFriend'
import { useState } from 'react'

const OnlineFriends = ({friends, otherUsers}) => {
  const [isHide, setIsHide] = useState(true)

  return (
    <div className='border-b border-slate-500'>
        <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Online Friends</h3>
            <button onClick={() => setIsHide(!isHide)} className={`${isHide ? 'bg-slate-500' : 'bg-red-400'} + 'text-sm text-white px-2 py-1 rounded-full`}>{isHide ? 'View All' : 'Close'}</button>
        </div>
        <div className='flex flex-col my-4'>
            {friends.length > 0 ? friends.map((friend) => (
              <Link key={friend._id} to={`profile/${friend.username}`}>
                <CardFriend user={friend} />
              </Link>
            )) : <p className='text-slate-400 font-semibold'>No friends</p>}

            {/* other users */}
            {!isHide && otherUsers.map((user) => (
              <Link key={user._id} to={`profile/${user.username}`}>
                <CardOtherFriend user={user} />
              </Link>
            ))}

        </div>
    </div>
  )
}

export default OnlineFriends