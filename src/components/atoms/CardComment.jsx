import axios from "axios"
import { useEffect, useState } from "react"

const CardComment = ({ comment, deleteCommentHandler, authUser }) => {
    const [user, setUser] = useState(null)

    const own = comment.userId === authUser?._id

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${comment?.userId}`)

            setUser(res.data.other)
        }

        getUser()
    }, [comment])

    const deleteHandler = async () => {
        if (own) {
            const konfirmasi = confirm('Deelete comment?')

            if (konfirmasi) {
                deleteCommentHandler(comment._id)
                
                await axios.delete(`${import.meta.env.VITE_API_URI}api/comments/${comment._id}`)
            }

        }
    }
  return (
    <div className="flex gap-3 items-center">
        <img 
            className="h-8 w-8 rounded-full object-cover border border-slate-500"
            src={import.meta.env.VITE_API_URI + (user?.profilePicture || 'users/default.jpeg')} 
            alt="profile comment" 
        />
        <div title={own ? 'Delete comment' : ''} onClick={deleteHandler} className={`flex flex-col gap-1 p-1 rounded-md bg-slate-700 ${own ? 'cursor-pointer hover:text-red-100': 'cursor-default'}`}>
            <h5 className="font-semibold text-sm">{user?.username}</h5>
            <p className="text-sm">{comment?.comment}</p>
        </div>
    </div>
  )
}

export default CardComment