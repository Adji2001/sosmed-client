const userReducer = (user = null, action = {}) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'FOLLOW_USER':
            return {
                ...user,
                followers: user.followers.concat([action.payload])
            }
        case 'UNFOLLOW_USER':
            return {
                ...user,
                followers: user.followers.filter((id) => id !== action.payload)
            }
        default:
            return user
    }
}

export default userReducer