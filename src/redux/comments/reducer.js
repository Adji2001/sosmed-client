const commentReducer = (comments = [], action = {}) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload
        case 'ADD_COMMENT':
            return [...comments, action.payload]
        default:
            return comments
    }
}

export default commentReducer