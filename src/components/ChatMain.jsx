import { BsEmojiSmile } from "react-icons/bs"
import ChatMainMessage from "./atoms/ChatMainMessage"
import { FiSend } from "react-icons/fi"
import { AiOutlinePaperClip } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useDispatch } from "react-redux"
import { addMessage } from "../redux/messages/action"

const ChatMain = ({ messages, currentUser, currentChat }) => {
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    const socket = io('https://sosmed-api-production.up.railway.app')

    const dispatch = useDispatch()


    useEffect(() => {
        socket?.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [socket, currentChat])


    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && dispatch(addMessage(arrivalMessage))
    }, [dispatch, arrivalMessage, currentChat])
    
    // send message to socket server
    useEffect(() => {
        // send to server
        socket?.emit('addUser', currentUser._id)

        // take from server
        // socket?.on('getUsers', users => {
        // console.log(users)
        // })
    }, [currentUser, socket])




    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessageHandler = async () => {
        const message = {
            conversationId: currentChat._id,
            sender: currentUser._id,
            text: newMessage
        }

        // socket actionnnnnnnn
        const receiverId = currentChat?.members.find((member) => member !== currentUser._id)

        socket?.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId,
            text: newMessage
        })

        message && dispatch(addMessage(message))
        setNewMessage("")
      
    }

    return (
        <div className="flex-[9] flex flex-col justify-between gap-3">
            <div className="flex flex-col overflow-y-auto px-2">
                {
                    messages.length > 0 ? messages.map((msg, i) => (
                        <div key={i} ref={scrollRef}>
                            <ChatMainMessage 
                                key={msg._id}
                                message={msg} 
                                own={msg.sender === currentUser._id} 
                                currentUser={currentUser}
                            />
                        </div>
                    ))
                    : <div className="flex items-center justify-center text-2xl text-slate-400 font-bold">no chat</div>
                }
            </div>

            <div className="flex px-2 py-3 border-t-2 border-slate-500 text-slate-100">
                <div className="flex-[1] text-xl flex justify-center items-center">
                    <BsEmojiSmile />
                </div>
                <input 
                    type="text" 
                    placeholder="Type a message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="border-none outline-none bg-transparent flex-[9]"
                />
                <div className="flex-[2] flex justify-center items-center gap-2">
                    <AiOutlinePaperClip className="text-xl" />
                    <button 
                        onClick={sendMessageHandler}
                        className="flex items-center justify-center p-2 bg-blue-400 rounded-full"
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatMain
