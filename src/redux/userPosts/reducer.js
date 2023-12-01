const userPostsReducer = (userPosts = [], action = {}) => {
    switch (action.type) {
        case 'SET_USER_POSTS':
            return action.payload
        default:
            return userPosts
    }
}

export default userPostsReducer