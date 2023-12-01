import ChatListUser from "./ChatListUser"

const ChatList = ({ conversations, currentUser, setCurrentChatHandler }) => {
    return (
        <div className="flex-[3] border-r px-2  h-full overflow-y-auto">
            <h2 className="text-xl text-slate-100 font-semibold mb-3">Chat List</h2>

            { conversations.length > 0 ?
                conversations.map((conv) => (
                    <div key={conv._id} onClick={() => setCurrentChatHandler(conv)}>
                        <ChatListUser 
                            conversation={conv} 
                            currentUser={currentUser} 
                        />
                    </div>
                )) : <div className="text-lg text-slate-400 font-semibold">No users</div>
            }
            
        </div>
    )
}

export default ChatList