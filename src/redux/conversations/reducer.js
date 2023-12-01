const conversationsReducer = (conversations = [], action = {}) => {
    switch (action.type) {
        case 'SET_CONVERSATIONS':
            return action.payload
        default:
            return conversations
    }
}

export default conversationsReducer