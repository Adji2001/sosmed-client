import axios from "axios"
import { useEffect, useState } from "react"

const FeedBottom = ({ post, comments}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const args = post.likes.length > 0 ? post.likes[post.likes.length - 1] : '64ffe2478a09538f3589d26e'

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${args}`)
        setUser(response.data.other)
      } catch (err) {
        console.log(err.message)
      }

    }
    
    fetchData()
  }, [post])

  
  
  return (
    <div className='flex gap-3 items-center'>
        <img src={post.likes.length === 0 ? `${import.meta.env.VITE_API_URI}users/blank.jpeg` : import.meta.env.VITE_API_URI + (user.profilePicture || 'users/default.jpeg')} alt="user" className='h-5 w-5 object-cover rounded-full ml-[7px] bg-slate-50' />
        <span className='text-xs font-light'>{post.likes.length} likes - {comments.length} replies</span>
    </div>
  )
}

export default FeedBottom