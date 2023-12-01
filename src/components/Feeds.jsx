import { useEffect, useState } from 'react'
import FeedTop from './atoms/FeedTop'
import FeedMain from './atoms/FeedMain'
import FeedBottom from './atoms/FeedBottom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost } from '../redux/posts/action'

const Feeds = ({post}) => {
  const currentUser = useSelector((states) => states.authUser)
  const isLike = post.likes.includes(currentUser._id)
  const [isHide, setIsHide] = useState(true)
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${post.userId}`)

      setUser(res.data.other)
    }

    fetchUser()
  }, [post.userId])

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}api/comments/${post._id}`)
        setComments(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getComments()
  }, [post])

  const likeHandler = async () => {
    dispatch(toggleLikePost(currentUser._id, post._id))
  }

  const hideHandler = () => {
    setIsHide(!isHide)
  }

  const addCommentHandler = (data) => {
    setComments(prev => [...prev, data])
  }

  const deleteCommentHandler = (commentId) => {
    setComments(prev => prev.filter(comment => comment._id !== commentId))
  }

  return (
    <div className='mb-8 text-slate-100 flex flex-col'>
        <FeedTop post={post} hideHandler={hideHandler} user={user} />
        <FeedMain 
          post={post} 
          user={user} 
          isLike={isLike} 
          likeHandler={likeHandler} 
          isHide={isHide} 
          hideHandler={hideHandler} 
          comments={comments}
          addCommentHandler={addCommentHandler}
          deleteCommentHandler={deleteCommentHandler} 
        />
        <FeedBottom post={post} comments={comments} />
    </div>
  )
}

export default Feeds