import axios from "axios"

export const setCommentss = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/comments/${postId}`)

            dispatch({type: 'SET_COMMENTS', payload: res.data})
            // console.log('data', postId)
        } catch (err) {
            console.log(err)
        }
    }
}

export const addComment = (body) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}api/comments`, body)

            console.log(res.data)
            dispatch({type: 'ADD_COMMENT', payload: res.data})
        } catch (err) {
            console.log(err)
        }
    }
}