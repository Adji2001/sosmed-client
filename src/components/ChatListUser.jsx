import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "timeago.js"

const ChatListUser = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const friendId = conversation && conversation.members.find((id) => id !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URI}api/users?userId=${friendId}`)

                setUser(res.data.other)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [conversation, currentUser])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URI}api/messages/${conversation._id}`)

                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getMessages()
    }, [conversation])

    return (
        <div className="flex items-center p-1 gap-2 bg-slate-100 text-slate-900 mb-2 cursor-pointer">
            <img 
                className="h-8 w-8 object-cover rounded-full bg-slate-100" 
                src={import.meta.env.VITE_API_URI + ((user && user.profilePicture) || 'users/default.jpeg')} 
                alt="profile" 
            />
            <div className="text-sm w-full">
                <div className="flex items-center justify-between">
                    <h5 className="font-semibold">{user ? user.username : 'loading...'}</h5>
                    <div className="text-xs font-light self-start">{messages.length > 0 && format(messages[messages.length - 1].createdAt)}</div>
                </div>
                <p className="chat_desc">{messages.length > 0 && messages[messages.length - 1].text}</p>
            </div>
        </div>
    )
}

export default ChatListUser