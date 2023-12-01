import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { format } from 'timeago.js'
import { deleteMessage } from "../../redux/messages/action"

const ChatMainMessage = ({ message, own, currentUser }) => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

    useEffect(() => {
        const userId = message && message.sender

        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${userId}`)

                setUser(res.data.other)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [message])

    const handleClick = async () => {
        if (own) {
            const confirmasi = confirm('Sure to delete chat?')

            if (confirmasi) {
                dispatch(deleteMessage(message._id))
            }
        }
    }

    return (
      <div className={`flex gap-3 relative mt-3 text-sm ${own && 'flex-row-reverse'}`}>
          <img 
            className="h-10 w-10 object-cover rounded-full self-end" 
            src={import.meta.env.VITE_API_URI + (own ? (currentUser.profilePicture || 'users/default.jpeg') : ((user && user.profilePicture) || 'users/default.jpeg'))} 
            alt="profile" 
          />
          <div title={own ? "delete chat" : ""} onClick={handleClick} className={`${own ? "bg-blue-500 text-slate-100 rounded-l-xl rounded-tr-xl cursor-pointer" : "bg-slate-100 text-slate-800 rounded-r-xl rounded-tl-xl"} max-w-xs p-2 flex flex-col gap-2 before:w-5 before:h-5 before:absolute before:bottom-0 ${own ? "before:bg-blue-500 before:right-10 before:rounded-tr-full" : "before:bg-slate-100 before:left-10 before:rounded-tl-full"}`}>
              <div className="flex items-center justify-between gap-5">
                  <h5 className="font-semibold">{own ? currentUser.username : (user ? user.username : 'loading...')}</h5>
                  <span className="text-xs font-light">{format(message.createdAt)}</span>
              </div>
              <p>{message.text}</p>
          </div>
      </div>
    )
}

export default ChatMainMessage