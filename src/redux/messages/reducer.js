const messagesReducer = (messages = [], action = {}) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return action.payload
        case 'SOME_MESSAGE':
            return messages.filter(msg => msg.conversationId === action.payload)
        case 'ADD_MESSAGE':
            return [...messages, action.payload]
        case 'DELETE_MESSAGE':
            return messages.filter((msg) => msg._id !== action.payload)
        default:
            return messages
    }
}

export default messagesReducer