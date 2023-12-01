import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import postsReducer from './posts/reducer'
import userPostsReducer from './userPosts/reducer'
import userReducer from './user/reducer'
import messagesReducer from './messages/reducer'
import conversationsReducer from './conversations/reducer'
import commentReducer from './comments/reducer'

export default configureStore({
    reducer: {
        authUser: authUserReducer,
        posts: postsReducer,
        userPosts: userPostsReducer,
        user: userReducer,
        messages: messagesReducer,
        conversations: conversationsReducer,
        commentss: commentReducer
    }
})