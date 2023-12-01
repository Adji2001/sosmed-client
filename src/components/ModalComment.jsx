import { useState } from "react"
import { FaRegComment } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CardComment from "./atoms/CardComment"
import axios from "axios"

const ModalComment = ({ post, comments, addCommentHandler, deleteCommentHandler }) => {
  const authUser = useSelector((states) => states.authUser)
  const [showModal, setShowModal] = useState(false)
  const [comment, setComment] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const body = {
        postId: post._id,
        userId: authUser._id,
        comment
    }

    const res = await axios.post(`${import.meta.env.VITE_API_URI}api/comments`, body)
    addCommentHandler(res.data)
    setComment('')

  }

  return (
    <>
      <button
        className='flex items-center justify-center cursor-pointer text-yellow-200'
        type="button"
        title="Comment post"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <FaRegComment />
      </button>
      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-slate-900 bg-opacity-50 outline-none focus:outline-none"
            style={{backdropFilter: "blur(10px)"}}
          >
            <div className="relative min-w-[95%] my-6 mx-auto max-w-3xl overflow-hidden">
              {/*content*/}
              <form onSubmit={submitHandler} className="border-0 overflow-hidden max-h-fit rounded-lg shadow-lg relative flex flex-col w-full text-slate-100 bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto mb-3 bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      setComment('')
                    }}
                  >
                    <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto overflow-hidden">
                  <div className="my-2 text-slate-500 text-lg leading-relaxed flex gap-1">

                    <div className="bg-slate-950 max-h-[400px] w-1/2 flex items-center justify-center overflow-hidden object-fill p-2">
                      {
                        post.img
                        ? <img src={import.meta.env.VITE_API_URI + post.img} alt="post image" className='h-full' />
                        : <h4 className="text-4xl text-slate-100 w-1/2 font-bold text-center">{post.desc}</h4>
                      }
                      
                    </div>
               
                    <div className="w-1/2 text-slate-100 p-2 relative overflow-hidden">
                        <h3 className="text-xl font-semibold">Comments</h3>
                        <div className="flex flex-col text-base h-[93%] overflow-hidden">

                            <div className="pt-2 flex flex-col gap-3 h-[300px] overflow-y-auto">
                                {
                                    comments.length > 0
                                    ? comments.map(comment => (
                                        <CardComment key={comment._id} post={post} comment={comment} deleteCommentHandler={deleteCommentHandler} authUser={authUser} />
                                    ))
                                    : <p>No comment</p>
                                }
                            </div>

                            <div className="flex gap-3 justify-between items-center">
                                <input
                                    className="bg-transparent outline-none border-none" 
                                    type="text" 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add new comment"
                                />
                                <button className="p-2 text-blue-500">kirim</button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}

export default ModalComment