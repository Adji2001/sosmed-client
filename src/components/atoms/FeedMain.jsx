import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import ModalEditFeed from '../ModalEditFeed'
import { deletePost } from '../../redux/posts/action'
import { Link } from 'react-router-dom'
import ModalComment from '../ModalComment'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'

const FeedMain = ({post, user, isLike, likeHandler, isHide, hideHandler, comments, addCommentHandler, deleteCommentHandler}) => {
  const authUser = useSelector((states) => states.authUser)

  const dispatch = useDispatch()

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure to delete post?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
      cancelButtonText: "No, Cancel",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post._id, authUser._id))
        hideHandler()
      }
    });

  }

  return (
    <div className='ml-4 p-5 w-[calc(100%-16px)] border-l border-slate-500 relative'>
        {post 
        ? (<>
            <p>{post.desc}</p>
            {post.img && <img src={import.meta.env.VITE_API_URI + post.img} alt="web" className='bg-slate-100 mt-3 w-4/6 max-h-72 object-cover' />}
          </>)
        : <Skeleton className='w-full h-28' baseColor='rgb(100 116 139)' highlightColor='rgb(148 163 184)' />}
        
        <div className='flex items-center gap-3 mt-2 text-2xl'>
            {isLike ? <FcLike className='text-[28px] cursor-pointer' onClick={likeHandler} /> : <FcLikePlaceholder className='text-[28px] cursor-pointer' onClick={likeHandler} />}
            {/* <FaRegComment className='cursor-pointer text-yellow-200' /> */}
            <ModalComment user={user} post={post} comments={comments} addCommentHandler={addCommentHandler} deleteCommentHandler={deleteCommentHandler} />
            <PiPaperPlaneTiltFill className='cursor-pointer text-blue-500' />
        </div>
        <div className={`${isHide ? 'hidden' : ''} + ' bg-slate-600 max-w-fit absolute top-0 right-0 text-slate-100 text-xs flex flex-col p-2 items-center rounded-s-lg rounded-b-lg`}>

          {authUser._id !== post.userId ? null : (
            <>
              <span onClick={deleteHandler} className='cursor-pointer pb-1 border-b border-blue-50 w-full text-center text-red-400 hover:font-semibold'>Delete</span>
              <ModalEditFeed post={post} hideHandler={hideHandler} />
            </>
          )}     

          <Link to={`profile/${user.username}`}>
            <span className='cursor-pointer mt-1 pb-1 border-b border-blue-50 w-full text-center hover:text-slate-50'>About this account</span>
          </Link>
          <span onClick={hideHandler} className='cursor-pointer mt-1 hover:font-semibold'>Cancel</span>
        </div>
    </div>
  )
}

export default FeedMain