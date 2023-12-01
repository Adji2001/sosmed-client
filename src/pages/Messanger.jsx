import Topbar from "../components/Topbar"
import ChatList from "../components/ChatList"
import ChatProfile from "../components/ChatProfile"
import ChatMain from "../components/ChatMain"
import Notification from "../components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import axios from "axios"
import EmptyMessage from "../components/EmptyMessage"
import { setMessages } from "../redux/messages/action"
import { setConversations } from "../redux/conversations/action"

const Messanger = () => {
  const authUser = useSelector((states) => states.authUser)
  const messages = useSelector((states) => states.messages)
  const conversations = useSelector((states) => states.conversations)

  // const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  // const [messages, setMessages] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setConversations(authUser._id))
  }, [dispatch, authUser])

  useEffect(() => {
    dispatch(setMessages(currentChat?._id))
  }, [currentChat, dispatch])

  const setCurrentChatHandler = (conv) => {
    setMessages([])
    !currentChat ? setCurrentChat(conv) : setCurrentChat(null)
  }

  return (
    <div className="flex w-[100%] overflow-hidden rounded-2xl bg-opacity-60 bg-slate-700 border border-slate-500" style={{backdropFilter: "blur(20px)"}}>
        <div className="flex flex-col flex-[9] overflow-y-auto border-r border-slate-500">
          <Topbar chat={true} logoutElement={<Notification />} />
          <div className="flex h-full overflow-y-hidden">
            <ChatList 
              conversations={conversations} 
              currentUser={authUser} 
              setCurrentChatHandler={setCurrentChatHandler}
            />
            {
              currentChat 
              ? <ChatMain 
                  messages={messages} 
                  currentUser={authUser} 
                  currentChat={currentChat} 
                /> 
              : <EmptyMessage />
            }
          </div>
        </div>
            {
              currentChat && 
              <ChatProfile
                currentUser={authUser}
                currentChat={currentChat}
              />
            }
    </div>
  )
}

export default Messanger