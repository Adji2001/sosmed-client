const postsReducer = (posts = [], action = {}) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.payload
        case 'ADD_POST':
            return [action.payload, ...posts]
        case 'TOGGLE_LIKE_POST':
            return posts.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likes: post.likes.includes(action.payload.userId)
                        ? post.likes.filter((id) => id !== action.payload.userId)
                        : post.likes.concat([action.payload.userId])
                    }
                }
                return post
            })
        case 'EDIT_POST':
            return posts.map((post) => {
                if (post._id === action.payload.postId && post.userId === action.payload.userId) {
                    return {
                        ...post,
                        desc: action.payload.desc,
                        img: action.payload.img
                    }
                }
                return post
            })
        case 'DELETE_POST':
            return posts.filter((post) => post._id !== action.payload)
        case 'SEARCH_POSTS':
            if (action.payload.keyword) {
                return action.payload.filteredPosts;
            }
            return posts;            
        default:
            return posts
    }
}

export default postsReducer